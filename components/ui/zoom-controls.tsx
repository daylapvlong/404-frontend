"use client";

import { MinusIcon, PlusIcon } from "./icons";

export function ZoomControls({ onZoomIn, onZoomOut }: { onZoomIn: () => void; onZoomOut: () => void }) {
  const btn = "flex size-9 items-center justify-center text-primary hover:bg-primary-light";
  return (
    <div role="group" aria-label="Zoom" className="inline-flex flex-col divide-y divide-line overflow-hidden rounded-md border border-line bg-surface shadow-sm">
      <button type="button" className={btn} onClick={onZoomIn} aria-label="Zoom in"><PlusIcon size={18} /></button>
      <button type="button" className={btn} onClick={onZoomOut} aria-label="Zoom out"><MinusIcon size={18} /></button>
    </div>
  );
}
