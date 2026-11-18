import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';

const source = readFileSync(new URL('../supabase/functions/_shared/auth.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const { isAuthenticatedUser } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);

async function withRuntime(values, fetcher, action) {
  const oldDeno = globalThis.Deno;
  const oldFetch = globalThis.fetch;
  globalThis.Deno = { env: { get: name => values[name] } };
  globalThis.fetch = fetcher;
  try { return await action(); }
  finally { globalThis.fetch = oldFetch; globalThis.Deno = oldDeno; }
}
const env = { SUPABASE_URL: 'https://example.invalid', SUPABASE_ANON_KEY: 'test-only' };
const request = () => new Request('https://example.invalid/function', { headers: { Authorization: 'Bearer test-only' } });

test('missing user authorization is rejected without network access', async () => {
  await withRuntime(env, () => { throw Error('must not fetch'); }, async () => {
    assert.equal(await isAuthenticatedUser(new Request('https://example.invalid')), false);
  });
});
test('missing platform configuration is rejected', async () => {
  await withRuntime({}, () => { throw Error('must not fetch'); }, async () => {
    assert.equal(await isAuthenticatedUser(request()), false);
  });
});
test('upstream rejection of an anonymous or expired token fails closed', async () => {
  await withRuntime(env, async () => new Response('{}', { status: 401 }), async () => {
    assert.equal(await isAuthenticatedUser(request()), false);
  });
});
test('authentication outage fails closed', async () => {
  await withRuntime(env, async () => { throw Error('simulated network outage'); }, async () => {
    assert.equal(await isAuthenticatedUser(request()), false);
  });
});
test('authenticated user is accepted after platform lookup', async () => {
  await withRuntime(env, async (url, options) => {
    assert.equal(url, 'https://example.invalid/auth/v1/user');
    assert.equal(options.headers.Authorization, 'Bearer test-only');
    return new Response(JSON.stringify({ id: 'synthetic-user-id' }));
  }, async () => assert.equal(await isAuthenticatedUser(request()), true));
});
