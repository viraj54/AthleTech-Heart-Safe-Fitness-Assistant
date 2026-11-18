# Feature implementation status

## Backend-connected paths

Supabase Auth powers signup, sign-in, sign-out, persisted sessions and reset-email requests. Protected routes redirect unauthenticated visitors. The schema creates a profile through a signup trigger. The reset-email request exists; a dedicated new-password form after recovery is not implemented.

The preferences page upserts equipment, muscle selection, duration and notification flags on `user_id`. Experience/goals currently use beginner/general-fitness defaults; earlier assessment/body-metric screens do not persist their inputs or pass them through the flow.

The dashboard reads recent workout sessions and totals existing calorie/session records. Its active-days value counts distinct dates in the seven-day query, not a consecutive-day streak. The active-workout demo does not insert these session records, so this edition does not provide an end-to-end saved workout log.

The AI button fetches saved preferences and any latest metric row, invokes `generate-workout`, and adds a preview card. Generated category/experience values are normalized for filtering. Card metadata are retained only in component state. Generated plans are not stored or connected to the execution screen, so their start button is disabled and labelled as a preview.

`generate-safety-tip` is supplied as a callable backend endpoint. The active-workout page currently displays its fixed exercise tips instead of calling this endpoint.

## Demonstration interfaces

- Active workout: fixed exercises and local set/rep/weight/rest state; no persistence.
- Workout summary: fixed duration, calories and personal-record values.
- Progress overview and analytics: static chart datasets and achievement values.
- Health dashboard and heart-health: illustrative heart rates, zones, scores and guidance copy; no measurements or individualized assessment.
- Safety alerts: predefined example notifications and settings. Acknowledge/adjust controls do not implement live alert management.
- Connected devices: local simulated connection state, with no Bluetooth or wearable API.
- Photos: placeholders and capture/upload notices; no storage bucket or upload path.
- Personal profile: sample fields and local edits; no saved profile update.
- Application settings: local preview controls; export, deletion, notifications and actual theme application are not implemented.
- Subscription: demonstration plans, no checkout.

These screens now display notices so example values are not presented as measured user data. A web manifest is included, but no offline service worker is implemented.
