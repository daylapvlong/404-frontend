"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { CloseIcon } from "./icons";
import { cn } from "./cn";

export interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  /**
   * Where the close (X) button sits:
   *  "end"   → "Review booking  ✕"
   *  "start" → "✕  Filter  Clear all"
   *  "none"  → title only / no header (drag handle only)
   */
  closePosition?: "start" | "end" | "none";
  /** Text button on the right, e.g. { label: "Clear all", onClick } */
  action?: { label: string; onClick: () => void };
  children: ReactNode;
  className?: string;
}

export function BottomSheet({
  open, onClose, title, closePosition = "end", action, children, className,
}: BottomSheetProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  // Escape to close, scroll lock, and move focus into the sheet while open.
  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus?.();
    };
  }, [open, onClose]);

  const closeButton = (
    <button
      type="button"
      onClick={onClose}
      aria-label="Close"
      className="flex size-8 items-center justify-center rounded-full hover:bg-page"
    >
      <CloseIcon size={20} />
    </button>
  );

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 transition-[visibility] duration-200",
        open ? "visible" : "invisible pointer-events-none",
      )}
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-black/40 transition-opacity duration-200 motion-reduce:transition-none",
          open ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        tabIndex={-1}
        className={cn(
          "absolute inset-x-0 bottom-0 mx-auto flex max-h-[90dvh] max-w-xl flex-col rounded-t-2xl bg-surface",
          "pb-[env(safe-area-inset-bottom)] outline-none shadow-xl",
          "transition-transform duration-200 motion-reduce:transition-none",
          open ? "translate-y-0" : "translate-y-full",
          className,
        )}
      >
        <div className="mx-auto mt-2 h-1 w-10 shrink-0 rounded-full bg-line-strong" aria-hidden="true" />
        {(title || closePosition !== "none" || action) && (
          <div className="flex shrink-0 items-center gap-2 px-4 pb-2 pt-3">
            {closePosition === "start" && <div className="-ml-2">{closeButton}</div>}
            {title && (
              <h2 id={titleId} className="flex-1 text-lg font-semibold">
                {title}
              </h2>
            )}
            {!title && <div className="flex-1" />}
            {action && (
              <button
                type="button"
                onClick={action.onClick}
                className="text-xs font-medium text-primary hover:underline"
              >
                {action.label}
              </button>
            )}
            {closePosition === "end" && <div className="-mr-2">{closeButton}</div>}
          </div>
        )}
        <div className="overflow-y-auto px-4 pb-4 pt-2">{children}</div>
      </div>
    </div>
  );
}
