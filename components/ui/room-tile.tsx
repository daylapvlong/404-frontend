import type { ElementType } from "react";
import { RoomImage } from "./room-image";

export interface RoomTileProps {
  roomNumber: string;
  /** "Study room · 8 seats" */
  meta: string;
  photoUrl?: string;
  href?: string;
  LinkComponent?: ElementType;
}

/** Compact photo tile used in horizontal rows ("Rooms – View all"). */
export function RoomTile({ roomNumber, meta, photoUrl, href, LinkComponent = "a" }: RoomTileProps) {
  const body = (
    <>
      <RoomImage src={photoUrl} className="h-20 w-full" />
      <div className="px-3 py-2">
        <p className="text-sm font-semibold">{roomNumber}</p>
        <p className="text-[11px] text-fg-secondary">{meta}</p>
      </div>
    </>
  );
  const cls = "block w-36 overflow-hidden rounded-lg border border-line bg-surface";
  return href ? (
    <LinkComponent href={href} className={cls}>{body}</LinkComponent>
  ) : (
    <div className={cls}>{body}</div>
  );
}
