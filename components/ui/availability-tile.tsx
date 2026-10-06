import { cn } from "./cn";

export interface AvailabilityTileProps {
  status: "free" | "booked";
  /** "until 14:30" */
  until: string;
  className?: string;
}

/** Big BOOKED / FREE status block for the room detail screen. */
export function AvailabilityTile({ status, until, className }: AvailabilityTileProps) {
  const free = status === "free";
  return (
    <div
      role="status"
      className={cn(
        "flex flex-col items-center justify-center rounded-lg px-4 py-4 text-center",
        free ? "bg-free-light text-free" : "bg-booked-light text-fg",
        className,
      )}
    >
      <p className="text-2xl font-bold tracking-tight">{free ? "FREE" : "BOOKED"}</p>
      <p className="text-xs">{until}</p>
    </div>
  );
}
