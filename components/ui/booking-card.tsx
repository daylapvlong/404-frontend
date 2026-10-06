"use client";

import type { ReactNode } from "react";
import { buttonClass } from "./button-styles";
import { NavigateIcon } from "./icons";

export interface BookingCardProps {
  roomNumber: string;
  /** "Wing A, Floor 2 · Meeting room" */
  locationLine: string;
  /** "Today · 13:00 – 14:30" */
  whenLine: string;
  /** booking_invitee count; hidden when 0/undefined */
  peopleCount?: number;
  /** Amber hint, e.g. "Check in by 13:15 or the booking is cancelled" */
  warning?: ReactNode;
  /** booking_series: "Every Tue until 17 Nov (8 times)" – shows "Cancel this one / Cancel all" */
  seriesLabel?: string;
  /** Provide to show the green Check in button */
  onCheckIn?: () => void;
  onCancel?: () => void;
  /** Only used when seriesLabel is set */
  onCancelSeries?: () => void;
  onShowOnMap?: () => void;
  onNavigate?: () => void;
  /** Check-in button spans the full width (used in the series layout) */
  fullWidthCheckIn?: boolean;
}

export function BookingCard({
  roomNumber, locationLine, whenLine, peopleCount, warning, seriesLabel,
  onCheckIn, onCancel, onCancelSeries, onShowOnMap, onNavigate, fullWidthCheckIn,
}: BookingCardProps) {
  const isSeries = Boolean(seriesLabel);
  return (
    <article className="rounded-lg border border-line bg-surface p-3">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-base font-semibold">{roomNumber}</h3>
        {onNavigate && (
          <button
            type="button"
            onClick={onNavigate}
            aria-label={`Navigate to ${roomNumber}`}
            className="flex size-8 items-center justify-center rounded-full bg-primary-light text-primary hover:bg-brand-100"
          >
            <NavigateIcon size={16} />
          </button>
        )}
      </div>

      <p className="mt-1 text-[11px] text-fg-secondary">
        {locationLine}
        {onShowOnMap && (
          <>
            {" · "}
            <button type="button" onClick={onShowOnMap} className="font-medium text-primary hover:underline">
              Show on map
            </button>
          </>
        )}
      </p>
      <p className="mt-1 text-sm">{whenLine}</p>

      {Boolean(peopleCount) && (
        <span className="mt-2 inline-block rounded-full bg-primary-light px-2 py-0.5 text-[11px] text-on-primary-light">
          {peopleCount} {peopleCount === 1 ? "person" : "people"}
        </span>
      )}
      {isSeries && <p className="mt-2 text-[11px] text-fg-secondary">{seriesLabel}</p>}
      {warning && <p className="mt-2 text-[11px] text-warning">{warning}</p>}

      {(onCheckIn || onCancel || onCancelSeries) && (
        <div className="mt-3 flex flex-wrap gap-2">
          {onCheckIn && (
            <button
              type="button"
              onClick={onCheckIn}
              className={buttonClass({ size: "sm", className: fullWidthCheckIn || isSeries ? "w-full" : "" })}
            >
              Check in
            </button>
          )}
          {onCancel && (
            <button type="button" onClick={onCancel} className={buttonClass({ size: "sm", variant: "outline" })}>
              {isSeries ? "Cancel this one" : "Cancel"}
            </button>
          )}
          {isSeries && onCancelSeries && (
            <button type="button" onClick={onCancelSeries} className={buttonClass({ size: "sm", variant: "outline" })}>
              Cancel all
            </button>
          )}
        </div>
      )}
    </article>
  );
}
