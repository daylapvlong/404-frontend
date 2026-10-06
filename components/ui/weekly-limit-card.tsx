import { ProgressRing } from "./progress-ring";

export interface WeeklyLimitCardProps {
  /** Minutes already booked this week */
  usedMinutes: number;
  /** booking_rule.limit_value (period = weekly) */
  limitMinutes: number;
  /** "Mon" – when the counter resets */
  resetsOn: string;
  /** "Mon 5 Oct" – shown when the limit is reached */
  nextAvailable?: string;
}

export function WeeklyLimitCard({ usedMinutes, limitMinutes, resetsOn, nextAvailable }: WeeklyLimitCardProps) {
  const reached = usedMinutes >= limitMinutes;
  const left = Math.max(limitMinutes - usedMinutes, 0);

  const ring = (
    <ProgressRing
      value={usedMinutes}
      max={limitMinutes}
      tone={reached ? "danger" : "accent"}
      size={reached ? 52 : 56}
      label="Booking time used this week"
    >
      <span className="text-sm font-medium">{usedMinutes}</span>
      <span className="mt-0.5 text-[9px] text-fg-secondary">min used</span>
    </ProgressRing>
  );

  return (
    <section className="rounded-lg border border-line bg-surface p-3">
      <div className="flex items-baseline justify-between gap-2 text-xs">
        <h3 className="font-semibold">{reached ? "Weekly limit reached" : "Booking time this week"}</h3>
        <p className="text-[11px] text-fg-secondary">
          {reached ? `${usedMinutes} of ${limitMinutes} min` : `Resets ${resetsOn}`}
        </p>
      </div>
      <div className="mt-2 flex items-center gap-3">
        {ring}
        {reached ? (
          <p className="text-xs text-fg-secondary">
            You used all {limitMinutes} min this week.
            {nextAvailable && ` You can book again from ${nextAvailable}.`}
          </p>
        ) : (
          <div>
            <p className="text-fg">
              <span className="text-2xl font-semibold">{left}</span>{" "}
              <span className="text-xs text-fg-secondary">min left</span>
            </p>
            <p className="text-[11px] text-fg-secondary">
              {usedMinutes} of {limitMinutes} min used
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
