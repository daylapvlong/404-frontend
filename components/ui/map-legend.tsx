import { cn } from "./cn";

const items = [
  { label: "Free now", swatch: "border-accent bg-free-light" },
  { label: "Booked", swatch: "border-line-strong bg-booked-light" },
  { label: "Not bookable", swatch: "border-line-strong bg-surface" },
] as const;

export function MapLegend({ className }: { className?: string }) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-x-4 gap-y-1", className)} aria-label="Map legend">
      {items.map((i) => (
        <li key={i.label} className="flex items-center gap-1.5 text-[11px] text-fg-secondary">
          <span aria-hidden="true" className={cn("size-3.5 rounded-sm border", i.swatch)} />
          {i.label}
        </li>
      ))}
    </ul>
  );
}
