import { forwardRef, useId, type TextareaHTMLAttributes } from "react";
import { cn } from "./cn";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

/** Multi-line field with the same look as the text input (e.g. "Describe the problem"). */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, error, className, id, rows = 4, ...props }, ref,
) {
  const auto = useId();
  const fieldId = id ?? auto;
  return (
    <div className="flex flex-col gap-1">
      {label && <label htmlFor={fieldId} className="text-[11px] text-fg-secondary">{label}</label>}
      <textarea
        ref={ref}
        id={fieldId}
        rows={rows}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${fieldId}-error` : undefined}
        className={cn(
          "w-full resize-y rounded-md border border-line-strong bg-surface px-3 py-2 text-sm placeholder:text-fg-disabled",
          "focus:border-line-focus disabled:bg-page disabled:text-fg-disabled",
          error && "border-danger",
          className,
        )}
        {...props}
      />
      {error && <p id={`${fieldId}-error`} className="text-[11px] text-danger">{error}</p>}
    </div>
  );
});
