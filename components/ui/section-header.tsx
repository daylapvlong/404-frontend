import type { ElementType } from "react";

export interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  href?: string;
  onAction?: () => void;
  LinkComponent?: ElementType;
}

/** "Rooms ........ View all" */
export function SectionHeader({
  title, actionLabel = "View all", href, onAction, LinkComponent = "a",
}: SectionHeaderProps) {
  const cls = "text-xs font-medium text-primary hover:underline";
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-sm font-semibold">{title}</h2>
      {href ? (
        <LinkComponent href={href} className={cls}>{actionLabel}</LinkComponent>
      ) : onAction ? (
        <button type="button" onClick={onAction} className={cls}>{actionLabel}</button>
      ) : null}
    </div>
  );
}
