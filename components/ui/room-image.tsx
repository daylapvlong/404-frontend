import { cn } from "./cn";

export interface RoomImageProps {
  /** URL of room_photo (first by sort_order). Grey placeholder when missing. */
  src?: string;
  alt?: string;
  className?: string;
}

/** Photo or grey placeholder. Size it with className (e.g. "size-14 rounded-md"). */
export function RoomImage({ src, alt = "", className }: RoomImageProps) {
  return (
    <div className={cn("shrink-0 overflow-hidden bg-muted", className)}>
      {src && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} loading="lazy" className="size-full object-cover" />
      )}
    </div>
  );
}
