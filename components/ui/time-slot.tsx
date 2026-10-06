"use client";

import { cn } from "./cn";

export interface TimeSlotProps {
  /** "13:00" */
  start: string;
  end: string;
  /** Right-hand label. Defaults to "Booked" for booked slots. */
  label?: string;
  state?: "available" | "booked";
  selected?: boolean;
  onSelect?: () => void;
}

/** One row in a day schedule: "13:00 – 14:30 ........ Booked". */
export function TimeSlot({ start, end, label, state = "available", selected, onSelect }: TimeSlotProps) {
  const booked = state === "booked";
  const right = label ?? (booked ? "Booked" : undefined);
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      disabled={booked && !onSelect}
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border bg-surface px-3 text-xs",
        selected ? "border-line-focus border-2" : "border-line",
        booked && "text-fg-secondary",
        !booked && !selected && "hover:bg-page",
      )}
    >
      <span className={cn(!booked && "font-medium")}>
        {start} – {end}
      </span>
      {right && <span className="text-fg-secondary">{right}</span>}
    </button>
  );
}
