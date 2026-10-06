"use client";

import { buttonClass } from "./button-styles";
import { EmptyState } from "./empty-state";
import { RoomImage } from "./room-image";

export interface NextBookingCardProps {
  /** Leave undefined for the empty state. */
  booking?: {
    roomNumber: string;
    /** "Deventer, School Building" */
    building: string;
    /** "Wing A, Floor 2 · Meeting room" */
    locationLine: string;
    /** "Today 13:00 – 14:30" */
    whenLine: string;
    photoUrl?: string;
    /** "Check in before 13:15". Hide the footer by leaving it undefined. */
    checkInHint?: string;
  };
  onCheckIn?: () => void;
  onBookRoom?: () => void;
}

export function NextBookingCard({ booking, onCheckIn, onBookRoom }: NextBookingCardProps) {
  return (
    <section className="rounded-lg border border-line bg-surface p-3">
      <h3 className="text-xs font-semibold">My next booking</h3>
      {booking ? (
        <>
          <div className="mt-3 flex gap-3">
            <RoomImage src={booking.photoUrl} className="size-14 rounded-md" />
            <div className="text-[11px] leading-snug text-fg-secondary">
              <p className="text-sm font-semibold text-fg">{booking.roomNumber}</p>
              <p>{booking.building}</p>
              <p>{booking.locationLine}</p>
              <p className="text-xs text-fg">{booking.whenLine}</p>
            </div>
          </div>
          {booking.checkInHint && (
            <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
              <p className="text-xs">{booking.checkInHint}</p>
              <button type="button" onClick={onCheckIn} className={buttonClass({ size: "sm" })}>
                Check in
              </button>
            </div>
          )}
        </>
      ) : (
        <EmptyState
          title="No upcoming bookings"
          description="When you book a room, it shows up here."
          actionLabel="Book a room"
          onAction={onBookRoom}
        />
      )}
    </section>
  );
}
