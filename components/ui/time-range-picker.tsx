"use client";

import { useId } from "react";
import { ChevronDownIcon } from "./icons";

export interface Option { value: string; label: string }

/** ["08:00", "08:30", …] between start and end (inclusive), in `stepMinutes` steps. */
export function buildTimeOptions(start = "08:00", end = "22:00", stepMinutes = 30): Option[] {
  const toMin = (t: string) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3, 5));
  const out: Option[] = [];
  for (let m = toMin(start); m <= toMin(end); m += stepMinutes) {
    const t = `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
    out.push({ value: t, label: t });
  }
  return out;
}

function LabeledSelect({
  label, value, onChange, options,
}: { label: string; value: string; onChange: (v: string) => void; options: Option[] }) {
  const id = useId();
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-1">
      <label htmlFor={id} className="text-[11px] text-fg-secondary">{label}</label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-full appearance-none rounded-md border border-line-strong bg-surface pl-3 pr-8 text-sm text-fg"
        >
          {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <ChevronDownIcon size={16} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2" />
      </div>
    </div>
  );
}

export interface TimeRangePickerProps {
  from: string;
  to: string;
  onFromChange: (v: string) => void;
  onToChange: (v: string) => void;
  /** Defaults to 08:00–22:00 in 30 minute steps */
  timeOptions?: Option[];
  /** Adds a second row: "Repeat [Every week]  Until [17 Nov]" (booking_series) */
  repeat?: {
    value: string;
    onChange: (v: string) => void;
    options: Option[];
    until: string;
    onUntilChange: (v: string) => void;
    untilOptions: Option[];
  };
}

export function TimeRangePicker({
  from, to, onFromChange, onToChange, timeOptions, repeat,
}: TimeRangePickerProps) {
  const times = timeOptions ?? buildTimeOptions();
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3">
        <LabeledSelect label="From" value={from} onChange={onFromChange} options={times} />
        <LabeledSelect label="To" value={to} onChange={onToChange} options={times} />
      </div>
      {repeat && (
        <div className="flex gap-3">
          <LabeledSelect label="Repeat" value={repeat.value} onChange={repeat.onChange} options={repeat.options} />
          <LabeledSelect label="Until" value={repeat.until} onChange={repeat.onUntilChange} options={repeat.untilOptions} />
        </div>
      )}
    </div>
  );
}
