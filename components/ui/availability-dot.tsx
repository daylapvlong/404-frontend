import { cn } from "./cn";

export interface AvailabilityDotProps {
  status: "free" | "booked";
  /** "Free until 14:00" / "Booked until 13:30" */
  label: string;
  className?: string;
}

export function AvailabilityDot({ status, label, className }: AvailabilityDotProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-xs",
        status === "free" ? "font-medium text-free" : "text-booked",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn("size-1.5 rounded-full", status === "free" ? "bg-free" : "bg-booked")}
      />
      {label}
    </span>
  );
}
