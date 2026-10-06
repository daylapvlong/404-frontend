import type { ElementType, ReactNode } from "react";
import { RoomImage } from "./room-image";
import { cn } from "./cn";

export interface BookingSummaryLine {
  text: ReactNode;
  /** "danger" for e.g. "Check-in closed at 13:15" */
  tone?: "default" | "danger";
}

export interface BookingSummaryCardProps {
  roomNumber: string;
  /** room_category.name – shown as a small tag top-right of the title */
  categoryName: string;
  /** "Deventer, School Building · Wing D, Floor 3" */
  locationLine: string;
  /** "Tue 29 Sep · 10:00 – 11:00" */
  whenLine: string;
  /** Extra lines: invited count, check-in window, … */
  lines?: BookingSummaryLine[];
  photoUrl?: string;
  href?: string;
  LinkComponent?: ElementType;
}

/** Large photo card for booking overviews (horizontal carousels). */
export function BookingSummaryCard({
  roomNumber, categoryName, locationLine, whenLine, lines = [], photoUrl, href, LinkComponent = "a",
}: BookingSummaryCardProps) {
  const body = (
    <>
      <RoomImage src={photoUrl} className="h-28 w-full" />
      <div className="flex flex-col gap-1 p-3 text-xs">
        <div className="flex items-center justify-between gap-2">
          <p className="text-base font-semibold">{roomNumber}</p>
          <span className="rounded-full bg-primary-light px-2 py-0.5 text-[11px] text-on-primary-light">
            {categoryName}
          </span>
        </div>
        <p>{locationLine}</p>
        <p>{whenLine}</p>
        {lines.map((l, i) => (
          <p key={i} className={cn(l.tone === "danger" && "text-danger")}>{l.text}</p>
        ))}
      </div>
    </>
  );
  const cls = "block w-72 shrink-0 overflow-hidden rounded-lg border border-line bg-surface";
  return href ? (
    <LinkComponent href={href} className={cls}>{body}</LinkComponent>
  ) : (
    <article className={cls}>{body}</article>
  );
}
