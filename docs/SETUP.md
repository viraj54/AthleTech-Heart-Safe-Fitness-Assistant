# Application setup

## Frontend

Install Node.js 22+, run `npm ci`, copy root `.env.example` to `.env` and enter your own Supabase URL and publishable/legacy anon key. Start with `npm run dev`. Rebuild after changing Vite variables for a production build.

Never use a service-role/secret key in a `VITE_` variable. The repository intentionally does not retain its original hosted-project URL/key.

## Supabase resources

Use a Supabase project you control. Apply the SQL migrations in filename order using the Supabase SQL tooling or CLI migration workflow. They are intended for an empty project schema; do not repeatedly paste initial CREATE statements into an existing populated schema.

With the CLI installed, the remote-project workflow is:

```sh
supabase login
supabase link --project-ref YOUR_PROJECT_REF
supabase db push
```

In Supabase Auth, enable the desired email/password settings. Set the Site URL and allowed redirect URLs to your development/app origins. The code requests reset emails, but does not include a new-password completion screen.

The `project_id = "athletech"` config is a generic local identifier. Linking selects the hosted project; no original project reference is embedded.

## AI functions

Copy `supabase/functions/.env.example` to `supabase/functions/.env` and fill it locally:

- `LOVABLE_API_KEY`: a gateway credential available to your account.
- `AI_MODEL`: an available gateway model identifier, not a placeholder.

The platform supplies `SUPABASE_URL` and `SUPABASE_ANON_KEY` to deployed functions. The shared helper uses these to check the caller's user session. For local function testing, provide the corresponding local project values if the local runtime does not supply them.

Configure secrets and deploy the provided functions with your project tooling. A CLI workflow is:

```sh
supabase secrets set --env-file supabase/functions/.env
supabase functions deploy generate-workout
supabase functions deploy generate-safety-tip
```

JWT verification remains enabled; call functions using a signed-in Supabase session. The model/account must be usable with the retained Lovable gateway endpoint. Merely setting an arbitrary model name or Google API key does not supply gateway access. Requests can fail because of provider availability, credits or rate limits.

The CORS policy currently allows all origins. No per-user usage quota, full generated-plan schema validation or clinical risk engine is implemented. Do not describe deployment of this prototype as a completed production/medical service.

## Hosting the built frontend

`npm run build` creates `dist/`. Serve it through a host that rewrites application routes to `index.html`, because the app uses BrowserRouter. Supabase and gateway resources remain separately configured services. The local preview command is `npm run preview`.
