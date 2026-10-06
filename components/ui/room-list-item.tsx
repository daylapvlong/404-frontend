"use client";

import type { ElementType } from "react";
import { AvailabilityDot } from "./availability-dot";
import { buttonClass } from "./button-styles";
import { ChevronRightIcon } from "./icons";
import { RoomImage } from "./room-image";
import { cn } from "./cn";

export interface RoomListItemProps {
  roomNumber: string;
  /** "Deventer, School Building" */
  building: string;
  /** "Wing B, Floor 2" – shown with the "Show on map" link when onShowOnMap is set */
  floorLine?: string;
  /** "Meeting room · 6 seats" */
  meta: string;
  /** e.g. "Tue 29 Sep · 10:00 – 11:00" (used for a booked time) */
  schedule?: string;
  availability?: { status: "free" | "booked"; label: string };
  photoUrl?: string;
  /**
   * Right side:
   *  "none"          – nothing
   *  "book"          – green Book button
   *  "book-disabled" – grey Book button (room unavailable)
   *  "chevron"       – chevron (row navigates)
   */
  trailing?: "none" | "book" | "book-disabled" | "chevron";
  /** Opens room details. Rendered as a link if href is set, otherwise a button. */
  href?: string;
  onSelect?: () => void;
  onBook?: () => void;
  onShowOnMap?: () => void;
  LinkComponent?: ElementType;
}

/**
 * Row card. The whole row is one click target (stretched link) while the
 * Book button and "Show on map" stay independently clickable.
 */
export function RoomListItem({
  roomNumber, building, floorLine, meta, schedule, availability, photoUrl,
  trailing = "none", href, onSelect, onBook, onShowOnMap, LinkComponent = "a",
}: RoomListItemProps) {
  const stretch = "after:absolute after:inset-0 after:content-['']";
  const titleCls = cn("text-left text-sm font-semibold", stretch);
  const title = href ? (
    <LinkComponent href={href} className={titleCls}>{roomNumber}</LinkComponent>
  ) : onSelect ? (
    <button type="button" onClick={onSelect} className={titleCls}>{roomNumber}</button>
  ) : (
    <span className="text-sm font-semibold">{roomNumber}</span>
  );

  return (
    <div className="relative flex items-center gap-3 rounded-lg border border-line bg-surface p-2 hover:bg-page/60">
      <RoomImage src={photoUrl} className="size-14 rounded-md" />
      <div className="min-w-0 flex-1 text-[11px] leading-snug text-fg-secondary">
        <div>{title}</div>
        <p>{building}</p>
        {floorLine && (
          <p>
            {floorLine}
            {onShowOnMap && (
              <>
                {" · "}
                <button
                  type="button"
                  onClick={onShowOnMap}
                  className="relative z-10 font-medium text-primary hover:underline"
                >
                  Show on map
                </button>
              </>
            )}
          </p>
        )}
        <p className="text-fg">{meta}</p>
        {schedule && <p className="text-fg">{schedule}</p>}
        {availability && <AvailabilityDot status={availability.status} label={availability.label} className="mt-0.5" />}
      </div>
      {(trailing === "book" || trailing === "book-disabled") && (
        <button
          type="button"
          onClick={onBook}
          disabled={trailing === "book-disabled"}
          className={buttonClass({ size: "sm", className: "relative z-10" })}
        >
          Book
        </button>
      )}
      {trailing === "chevron" && <ChevronRightIcon size={18} className="mr-1 text-fg-secondary" />}
    </div>
  );
}
