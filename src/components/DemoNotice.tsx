export const DemoNotice = ({ children }: { children: React.ReactNode }) => (
  <aside role="note" className="mb-4 rounded-lg border border-primary/20 bg-primary/5 p-3 text-sm text-foreground">
    <strong>Demonstration screen. </strong>{children}
  </aside>
);
