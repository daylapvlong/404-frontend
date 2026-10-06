import type { ReactNode } from "react";
import { ChevronDownIcon, ChevronLeftIcon } from "./icons";
import { cn } from "./cn";

export interface TopBarProps {
  /** Page title, or the app name on the home screen. */
  title?: string;
  /** Small right-aligned text, e.g. "Deventer, School Building". */
  subtitle?: string;
  /** Shows a back arrow when provided. */
  onBack?: () => void;
  backLabel?: string;
  /** Right-hand slot, e.g. <CampusPill />. */
  trailing?: ReactNode;
  className?: string;
}

/**
 * Green app bar. Figma variants:
 *  - brand + campus pill:  <TopBar title="RoomNotFound" trailing={<CampusPill .../>} />
 *  - back + title:         <TopBar title="Room details" onBack={...} />
 *  - title + subtitle:     <TopBar title="Room details" subtitle="Deventer, School Building" />
 *  - back only:            <TopBar onBack={...} />
 */
export function TopBar({ title, subtitle, onBack, backLabel = "Back", trailing, className }: TopBarProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-30 bg-primary pt-[env(safe-area-inset-top)] text-on-primary",
        className,
      )}
    >
      <div className="flex h-12 items-center gap-3 px-4">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            aria-label={backLabel}
            className="-ml-2 flex size-8 items-center justify-center rounded-full hover:bg-white/10"
          >
            <ChevronLeftIcon />
          </button>
        )}
        {title && <h1 className="min-w-0 flex-1 truncate text-base font-semibold">{title}</h1>}
        {!title && <div className="flex-1" />}
        {subtitle && <p className="max-w-[55%] truncate text-xs">{subtitle}</p>}
        {trailing}
      </div>
    </header>
  );
}

export interface CampusPillProps {
  /** location.name */
  campus: string;
  onClick?: () => void;
}

/** "Deventer ⌄" pill for the top bar. Opens your campus picker. */
export function CampusPill({ campus, onClick }: CampusPillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-haspopup="dialog"
      aria-label={`Campus: ${campus}. Change campus`}
      className="flex h-8 items-center gap-1 rounded-md bg-white/15 pl-3 pr-2 text-xs font-medium hover:bg-white/25"
    >
      {campus}
      <ChevronDownIcon size={16} />
    </button>
  );
}
