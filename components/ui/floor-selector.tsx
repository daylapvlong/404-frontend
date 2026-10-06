"use client";

import { cn } from "./cn";

export interface FloorSelectorProps {
  /** room.floor_level values, e.g. [0,1,2,3,4,5] */
  floors: number[];
  value: number;
  onChange: (floor: number) => void;
}

/** "Floor [0][1][2][3][4][5]" */
export function FloorSelector({ floors, value, onChange }: FloorSelectorProps) {
  return (
    <div role="radiogroup" aria-label="Floor" className="flex items-center gap-2">
      <span className="text-xs text-fg-secondary">Floor</span>
      {floors.map((f) => {
        const active = f === value;
        return (
          <button
            key={f}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(f)}
            className={cn(
              "size-8 rounded-md border text-xs",
              active
                ? "border-primary bg-primary font-medium text-on-primary"
                : "border-line-strong bg-surface hover:bg-page",
            )}
          >
            {f}
          </button>
        );
      })}
    </div>
  );
}
