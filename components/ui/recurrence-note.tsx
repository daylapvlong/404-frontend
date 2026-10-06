/** "Every week until 17 Nov (8 times)" */
export function RecurrenceNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-md bg-primary-light px-3 py-2 text-xs text-on-primary-light">{children}</p>
  );
}
