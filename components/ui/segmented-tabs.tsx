"use client";

import { useRef, type KeyboardEvent } from "react";
import { cn } from "./cn";

export interface TabItem { id: string; label: string }

export interface SegmentedTabsProps {
  items: TabItem[];
  value: string;
  onChange: (id: string) => void;
  label?: string;
}

/** "Upcoming | Past" underline tabs with arrow-key navigation. */
export function SegmentedTabs({ items, value, onChange, label = "Views" }: SegmentedTabsProps) {
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  const onKeyDown = (e: KeyboardEvent, index: number) => {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (index + dir + items.length) % items.length;
    onChange(items[next].id);
    refs.current[next]?.focus();
  };

  return (
    <div role="tablist" aria-label={label} className="flex">
      {items.map((item, i) => {
        const active = item.id === value;
        return (
          <button
            key={item.id}
            ref={(el) => { refs.current[i] = el; }}
            role="tab"
            type="button"
            id={`tab-${item.id}`}
            aria-selected={active}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(item.id)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={cn(
              "h-10 flex-1 border-b-2 text-sm font-medium transition-colors",
              active
                ? "border-primary bg-surface text-primary"
                : "border-line bg-page/60 text-fg-secondary hover:text-fg",
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
