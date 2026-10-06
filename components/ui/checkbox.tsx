"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { CheckIcon } from "./icons";
import { cn } from "./cn";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label: string;
}

/** Facility filter box ("Screen / monitor"). Native input underneath, so forms and a11y just work. */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, className, ...props }, ref,
) {
  return (
    <label className={cn("inline-flex cursor-pointer items-center gap-2 text-sm has-[:disabled]:cursor-not-allowed has-[:disabled]:text-fg-disabled", className)}>
      <input ref={ref} type="checkbox" className="peer sr-only" {...props} />
      <span
        aria-hidden="true"
        className="flex size-5 items-center justify-center rounded border border-line-strong bg-surface text-transparent peer-checked:border-primary peer-checked:bg-primary peer-checked:text-on-primary peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-line-focus"
      >
        <CheckIcon size={14} strokeWidth={3} />
      </span>
      {label}
    </label>
  );
});
