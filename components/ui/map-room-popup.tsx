"use client";

import { buttonClass } from "./button-styles";
import { CloseIcon, NavigateIcon } from "./icons";

export interface MapRoomPopupProps {
  roomNumber: string;
  /** "Deventer, School Building" */
  building: string;
  /** "Wing D, Floor 3" */
  floorLine: string;
  /** "Study room · 12 people" */
  meta: string;
  /** Walking hint: "Take the lift to floor 3. …" */
  directions?: string;
  onClose: () => void;
  onNavigate: () => void;
  /** Omit to hide the "Room details" button (e.g. non-bookable rooms) */
  onDetails?: () => void;
}

/** Card that appears when a room is tapped on the map. */
export function MapRoomPopup({
  roomNumber, building, floorLine, meta, directions, onClose, onNavigate, onDetails,
}: MapRoomPopupProps) {
  return (
    <section aria-label={`Room ${roomNumber}`} className="rounded-lg border border-line bg-surface p-3 shadow-md">
      <div className="flex items-start justify-between">
        <h3 className="text-base font-semibold">{roomNumber}</h3>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="-mr-1 -mt-1 flex size-8 items-center justify-center rounded-full hover:bg-page"
        >
          <CloseIcon size={20} />
        </button>
      </div>
      <div className="mt-1 text-[11px] leading-snug text-fg-secondary">
        <p>{building}</p>
        <p>{floorLine}</p>
        <p className="text-xs text-fg">{meta}</p>
      </div>
      {directions && <p className="mt-2 text-[11px] text-fg-secondary">{directions}</p>}
      <div className="mt-3 flex gap-2">
        {onDetails && (
          <button type="button" onClick={onDetails} className={buttonClass({ variant: "outline-brand" })}>
            Room details
          </button>
        )}
        <button type="button" onClick={onNavigate} className={buttonClass()}>
          <NavigateIcon size={16} />
          Navigate
        </button>
      </div>
    </section>
  );
}
