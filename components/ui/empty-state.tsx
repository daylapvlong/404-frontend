import type { ReactNode } from "react";
import { buttonClass } from "./button-styles";

export interface EmptyStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  children?: ReactNode;
}

/** "No upcoming bookings / When you book a room, it shows up here. [Book a room]" */
export function EmptyState({ title, description, actionLabel, onAction, children }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-2 px-4 py-4 text-center">
      <p className="text-sm font-semibold">{title}</p>
      {description && <p className="max-w-xs text-xs text-fg-secondary">{description}</p>}
      {actionLabel && (
        <button type="button" onClick={onAction} className={buttonClass({ size: "sm", className: "mt-1" })}>
          {actionLabel}
        </button>
      )}
      {children}
    </div>
  );
}

export interface ConfirmationMessageProps {
  title: string;
  description?: string;
}

/** "Booking confirmed / We sent the details to your email and to 3 invited people." */
export function ConfirmationMessage({ title, description }: ConfirmationMessageProps) {
  return (
    <div role="status" className="flex flex-col items-center gap-1 text-center">
      <p className="text-base font-semibold">{title}</p>
      {description && <p className="max-w-xs text-xs text-fg-secondary">{description}</p>}
    </div>
  );
}
