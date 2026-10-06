import type { ReactNode } from "react";

export function DetailList({ children }: { children: ReactNode }) {
  return <dl className="flex flex-col gap-2">{children}</dl>;
}

/** "Location ........ Wing D, Floor 3" */
export function DetailRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4 text-xs">
      <dt className="text-fg-secondary">{label}</dt>
      <dd className="text-right font-medium">{value}</dd>
    </div>
  );
}
