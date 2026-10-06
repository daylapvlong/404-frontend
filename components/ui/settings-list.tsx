import type { ReactNode } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "./icons";
import { cn } from "./cn";

export function SettingsList({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <ul className={cn("divide-y divide-line overflow-hidden rounded-lg border border-line bg-surface", className)}>
      {children}
    </ul>
  );
}

export interface SettingsRowProps {
  label: string;
  /** Current value shown on the right, e.g. "Deventer" */
  value?: string;
  /** Icon after the value: "down" for pickers, "right" for navigation. */
  chevron?: "down" | "right";
  /** Makes the whole row a button (pickers / navigation). */
  onClick?: () => void;
  /**
   * Inline control, e.g. your <Toggle />. The row becomes a <label>
   * so tapping anywhere toggles it.
   */
  control?: ReactNode;
}

/**
 * Rows for the profile/settings screen (user_preference):
 *   <SettingsRow label="Default campus" value="Deventer" chevron="down" onClick={...} />
 *   <SettingsRow label="Notifications" control={<Toggle ... />} />
 *   <SettingsRow label="Default campus" chevron="right" onClick={...} />
 */
export function SettingsRow({ label, value, chevron, onClick, control }: SettingsRowProps) {
  const inner = (
    <>
      <span className="flex-1 text-left text-xs">{label}</span>
      {value && <span className="text-xs text-fg-secondary">{value}</span>}
      {chevron === "down" && <ChevronDownIcon size={16} className="text-fg-secondary" />}
      {chevron === "right" && <ChevronRightIcon size={16} className="text-fg-secondary" />}
      {control}
    </>
  );
  const row = "flex min-h-11 w-full items-center gap-2 px-3 py-2";
  return (
    <li>
      {onClick ? (
        <button type="button" onClick={onClick} className={cn(row, "hover:bg-page")}>{inner}</button>
      ) : control ? (
        <label className={cn(row, "cursor-pointer")}>{inner}</label>
      ) : (
        <div className={row}>{inner}</div>
      )}
    </li>
  );
}
