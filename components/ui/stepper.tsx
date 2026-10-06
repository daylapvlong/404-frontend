"use client";

import { MinusIcon, PlusIcon } from "./icons";

export interface StepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  /** Accessible name, e.g. "Number of people" */
  label: string;
}

/** − 4 +  (e.g. attendees, compared with room.capacity) */
export function Stepper({ value, onChange, min = 1, max = 99, step = 1, label }: StepperProps) {
  const btn =
    "flex size-8 items-center justify-center rounded-md border border-line-strong bg-surface hover:bg-page disabled:cursor-not-allowed disabled:text-fg-disabled disabled:hover:bg-surface";
  return (
    <div role="group" aria-label={label} className="inline-flex items-center gap-3">
      <button type="button" className={btn} aria-label="Decrease" disabled={value <= min} onClick={() => onChange(Math.max(min, value - step))}>
        <MinusIcon size={16} />
      </button>
      <output aria-live="polite" className="min-w-4 text-center text-sm">{value}</output>
      <button type="button" className={btn} aria-label="Increase" disabled={value >= max} onClick={() => onChange(Math.min(max, value + step))}>
        <PlusIcon size={16} />
      </button>
    </div>
  );
}
