"use client";

import { useMemo, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "./icons";
import { cn } from "./cn";

export interface CalendarProps {
  /** Selected day */
  value?: Date;
  onChange: (date: Date) => void;
  /** Disable days (past days, closed days, outside the booking window …) */
  isDisabled?: (date: Date) => boolean;
  /** Month shown first. Defaults to the selected day or today. */
  defaultMonth?: Date;
  locale?: string;
}

const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

export function Calendar({ value, onChange, isDisabled, defaultMonth, locale = "en-GB" }: CalendarProps) {
  const today = useMemo(() => new Date(), []);
  const [month, setMonth] = useState(() => {
    const base = defaultMonth ?? value ?? today;
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });

  const monthLabel = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(month);
  // Weeks start on Monday. Letters from a known Monday (2024-01-01).
  const weekdays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(2024, 0, 1 + i);
    return {
      short: new Intl.DateTimeFormat(locale, { weekday: "narrow" }).format(d),
      long: new Intl.DateTimeFormat(locale, { weekday: "long" }).format(d),
    };
  });

  const leading = (month.getDay() + 6) % 7; // blanks before the 1st
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const cells: Array<Date | null> = [
    ...Array<null>(leading).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(month.getFullYear(), month.getMonth(), i + 1)),
  ];

  const shift = (delta: number) => setMonth(new Date(month.getFullYear(), month.getMonth() + delta, 1));

  return (
    <div className="w-full max-w-xs select-none">
      <div className="flex items-center justify-between pb-2">
        <button
          type="button"
          onClick={() => shift(-1)}
          aria-label="Previous month"
          className="flex size-8 items-center justify-center rounded-full text-primary hover:bg-primary-light"
        >
          <ChevronLeftIcon size={18} />
        </button>
        <p className="text-sm font-semibold" aria-live="polite">{monthLabel}</p>
        <button
          type="button"
          onClick={() => shift(1)}
          aria-label="Next month"
          className="flex size-8 items-center justify-center rounded-full text-primary hover:bg-primary-light"
        >
          <ChevronRightIcon size={18} />
        </button>
      </div>

      <div className="grid grid-cols-7 text-center text-[11px] text-fg-secondary">
        {weekdays.map((d, i) => (
          <abbr key={i} title={d.long} className="py-1 no-underline">{d.short}</abbr>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1 text-sm">
        {cells.map((date, i) => {
          if (!date) return <span key={`b${i}`} />;
          const selected = value ? sameDay(date, value) : false;
          const disabled = isDisabled?.(date) ?? false;
          const isToday = sameDay(date, today);
          return (
            <button
              key={date.toISOString()}
              type="button"
              disabled={disabled}
              onClick={() => onChange(date)}
              aria-pressed={selected}
              aria-current={isToday ? "date" : undefined}
              aria-label={new Intl.DateTimeFormat(locale, { dateStyle: "full" }).format(date)}
              className={cn(
                "mx-auto flex size-9 items-center justify-center rounded-full",
                selected
                  ? "bg-primary font-medium text-on-primary"
                  : disabled
                    ? "cursor-not-allowed text-fg-disabled"
                    : "hover:bg-primary-light",
                isToday && !selected && "font-semibold text-primary",
              )}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
