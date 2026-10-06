import { cn } from "./cn";

/**
 * Class helper used by the composite components so they work before the
 * foundation <Button> exists. Once <Button> lands, swap the usages for it.
 */
export type ButtonVariant = "primary" | "outline" | "outline-brand" | "danger";
export type ButtonSize = "sm" | "md";

export function buttonClass({
  variant = "primary",
  size = "md",
  className,
}: { variant?: ButtonVariant; size?: ButtonSize; className?: string } = {}) {
  return cn(
    "inline-flex shrink-0 items-center justify-center gap-2 rounded-md font-medium transition-colors",
    "disabled:cursor-not-allowed disabled:bg-muted disabled:text-fg-disabled disabled:border-transparent",
    size === "sm" ? "h-8 px-3 text-xs" : "h-10 px-4 text-sm",
    variant === "primary" && "bg-primary text-on-primary hover:bg-brand-800",
    variant === "danger" && "bg-danger text-white hover:bg-danger-600/90",
    variant === "outline" && "border border-line-strong bg-surface text-fg hover:bg-page",
    variant === "outline-brand" && "border border-line-strong bg-surface text-primary hover:bg-primary-light",
    className,
  );
}
