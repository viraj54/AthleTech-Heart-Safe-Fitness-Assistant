# Security and personal data

Use only publishable/legacy anon Supabase keys in browser configuration. They identify the project/client and do not replace row-level authorization. Keep service-role keys, database passwords and `LOVABLE_API_KEY` server-side.

The ZIP excludes private `.env` files and the original backend binding. If a secret is exposed in a future commit, revoke it through its provider and remove it from retained history; deleting a working-tree file does not remove past commits.

The included SQL enables table RLS with owner-based policies. These were reviewed as source, not tested against a live database. Deployed policies, authentication settings and storage resources need their own checks before personal data is used.

AI generation sends caller-provided context to a third-party gateway. Health-condition and injury fields may be sensitive. Use synthetic examples for demonstrations. Prompting an AI for general fitness guidance does not implement a medical assessment or safety guarantee.

The backend checks signed-in user identity, but does not implement per-user billing/usage quotas. Generated JSON is parsed but not fully schema-validated. Device, chart and alert sample screens are explicitly labelled and do not run live monitoring.
