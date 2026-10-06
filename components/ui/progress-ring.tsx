import type { ReactNode } from "react";
import { cn } from "./cn";

export interface ProgressRingProps {
  value: number;
  max: number;
  /** "accent" = Saxion green, "danger" = red (limit reached) */
  tone?: "accent" | "danger";
  size?: number;
  strokeWidth?: number;
  /** Centre content, e.g. the number and "min used" */
  children?: ReactNode;
  label?: string;
}

/** Donut used for the weekly booking-time limit. */
export function ProgressRing({
  value, max, tone = "accent", size = 56, strokeWidth = 5, children, label,
}: ProgressRingProps) {
  const r = (size - strokeWidth) / 2;
  const c = 2 * Math.PI * r;
  const ratio = max > 0 ? Math.min(Math.max(value / max, 0), 1) : 0;
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={Math.min(value, max)}
      aria-label={label}
      className="relative shrink-0"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={strokeWidth} className="stroke-muted" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - ratio)}
          className={cn(tone === "danger" ? "stroke-danger" : "stroke-accent")}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center leading-none">
        {children}
      </div>
    </div>
  );
}
