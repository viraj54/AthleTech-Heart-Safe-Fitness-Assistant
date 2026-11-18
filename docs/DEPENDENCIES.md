# Dependency audit

The dependency lockfile was refreshed using compatible updates. React Router was upgraded to v7 and Zod to v4; auth-form validation uses Zod's `issues` API. Frontend type checking, lint, authentication-helper tests and production build passed after those changes.

`tailwindcss-animate` is a build-time Tailwind plugin and is classified as a development dependency. The production-only npm audit reports 0 advisories. The full audit reports 20 findings (9 high, 11 moderate), including propagated reports in the build/lint toolchain. This is not a claim of a vulnerability-free development environment.

## Remaining full-audit findings

| Package | Severity |
|---|---|
| `@tailwindcss/typography` | moderate |
| `@typescript-eslint/eslint-plugin` | moderate |
| `@typescript-eslint/parser` | moderate |
| `@typescript-eslint/type-utils` | moderate |
| `@typescript-eslint/typescript-estree` | high |
| `@typescript-eslint/utils` | moderate |
| `anymatch` | high |
| `chokidar` | high |
| `esbuild` | moderate |
| `fast-glob` | high |
| `glob` | moderate |
| `micromatch` | high |
| `minimatch` | moderate |
| `picomatch` | high |
| `postcss-selector-parser` | moderate |
| `readdirp` | high |
| `sucrase` | moderate |
| `tailwindcss` | high |
| `typescript-eslint` | moderate |
| `vite` | high |

These include Tailwind v3 file-matching dependencies, esbuild/Vite development-server tooling, selector parsing and lint dependencies. The audit proposes major framework/tool changes for some fixes. A Tailwind v4/Vite major migration is not included in this repository-preparation edition. Keep development servers private and address those upgrades before describing the project as production-hardened. Live Supabase, function-runtime and database policies require separate verification.
