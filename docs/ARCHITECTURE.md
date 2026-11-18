# Architecture

The Vite/React browser client uses React Router for navigation, Supabase Auth for session state, TanStack Query for user-specific reads and generated Supabase TypeScript types for table access.

`src/integrations/supabase/client.ts` reads only the two browser-visible Vite configuration values. Missing/example configuration renders a setup screen before mounting the authentication provider. Vite substitutes these public settings into the build, so they must not contain service-role, database-password or gateway secrets.

The migrations define profiles, user metrics/preferences/health conditions, exercises, workout sessions/sets, photos, achievements and safety alerts. They include owner-scoped RLS policies and a signup-trigger profile insert. The public exercise catalog is readable through a SELECT policy. Schema existence does not mean every table has a connected UI.

The Edge Functions handle OPTIONS, reject non-POST requests, verify an actual user through the platform Auth endpoint, check the configured model ID, and then call the gateway. Platform JWT verification remains enabled. User lookup is an additional check because a project anon JWT is not a signed-in user session. AI secrets are read from the server environment.

Workout prompts include equipment, experience, goals, duration and optional height/weight. Guidance prompts accept an exercise name and context. Basic request checks are included, but generated workout JSON is not validated against a complete schema and there is no medical safety validator. The gateway URL remains the original integration; the model is selected through `AI_MODEL` instead of a hardcoded model ID.

The five authentication-helper tests transpile the shared TypeScript helper and run it in Node with simulated environment/fetch behavior. This is a contract check, not a live hosted-function deployment test.
