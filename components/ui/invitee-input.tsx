"use client";

import { useId, useState, type KeyboardEvent } from "react";
import { buttonClass } from "./button-styles";
import { CloseIcon } from "./icons";

export interface InviteeInputProps {
  /** booking_invitee.email values */
  value: string[];
  onChange: (emails: string[]) => void;
  max?: number;
  label?: string;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Email field + Add button; added addresses show as removable pills. */
export function InviteeInput({ value, onChange, max = 20, label = "Email address" }: InviteeInputProps) {
  const id = useId();
  const [draft, setDraft] = useState("");
  const [error, setError] = useState<string>();

  const add = () => {
    const email = draft.trim().toLowerCase();
    if (!email) return;
    if (!EMAIL.test(email)) return setError("Enter a valid email address.");
    if (value.includes(email)) return setError("This person is already invited.");
    if (value.length >= max) return setError(`You can invite up to ${max} people.`);
    onChange([...value, email]);
    setDraft("");
    setError(undefined);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      add();
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-end gap-2">
        <div className="flex flex-1 flex-col gap-1">
          <label htmlFor={id} className="sr-only">{label}</label>
          <input
            id={id}
            type="email"
            inputMode="email"
            autoComplete="off"
            placeholder={label}
            value={draft}
            onChange={(e) => { setDraft(e.target.value); setError(undefined); }}
            onKeyDown={onKeyDown}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${id}-error` : undefined}
            className="h-10 w-full rounded-md border border-line-strong bg-surface px-3 text-sm placeholder:text-fg-disabled focus:border-line-focus"
          />
        </div>
        <button type="button" onClick={add} className={buttonClass({ size: "md" })}>Add</button>
      </div>
      {error && <p id={`${id}-error`} className="text-[11px] text-danger">{error}</p>}
      {value.length > 0 && (
        <ul className="flex flex-wrap gap-2">
          {value.map((email) => (
            <li key={email} className="inline-flex items-center gap-1 rounded-full bg-primary-light py-1 pl-3 pr-2 text-xs text-on-primary-light">
              {email}
              <button
                type="button"
                onClick={() => onChange(value.filter((e) => e !== email))}
                aria-label={`Remove ${email}`}
                className="flex size-5 items-center justify-center rounded-full hover:bg-brand-100"
              >
                <CloseIcon size={14} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
