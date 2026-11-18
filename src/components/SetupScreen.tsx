export const SetupScreen = () => (
  <main className="min-h-screen bg-background flex items-center justify-center p-6">
    <section className="max-w-xl rounded-xl border bg-card p-8 space-y-4">
      <h1 className="text-3xl font-bold">Set up AthleTech</h1>
      <p>Configure your Supabase project to enable accounts and saved preferences.</p>
      <p>Copy <code>.env.example</code> to <code>.env</code>, set
        <code> VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_PUBLISHABLE_KEY</code>,
        then restart the development server.</p>
      <p className="text-sm text-muted-foreground">See docs/SETUP.md for the database and AI-function configuration.</p>
    </section>
  </main>
);
