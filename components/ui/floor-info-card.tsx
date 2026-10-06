import type { ReactNode } from "react";

export interface FloorInfoCardProps {
  /** "Floor 3" */
  title: string;
  /** "Whole floor" */
  subtitle?: string;
  /** "Tap a spot to jump there. The box is what you see below." */
  hint?: string;
  /** Mini-map of the floor_plan with the visible-area box */
  minimap?: ReactNode;
}

export function FloorInfoCard({ title, subtitle, hint, minimap }: FloorInfoCardProps) {
  return (
    <div className="flex gap-3 rounded-lg border border-line bg-surface p-2">
      <div className="size-14 shrink-0 overflow-hidden rounded-md bg-page">{minimap}</div>
      <div className="text-[11px] leading-snug text-fg-secondary">
        <p className="text-xs font-semibold text-fg">{title}</p>
        {subtitle && <p>{subtitle}</p>}
        {hint && <p>{hint}</p>}
      </div>
    </div>
  );
}
