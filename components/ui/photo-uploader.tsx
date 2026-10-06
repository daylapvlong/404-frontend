"use client";

import { useEffect, useMemo, useRef } from "react";
import { CameraIcon, CloseIcon } from "./icons";

export interface PhotoUploaderProps {
  /** Files chosen so far (sent as issue_attachment rows) */
  files: File[];
  onChange: (files: File[]) => void;
  max?: number;
  /** Max size per file in bytes. Larger files are ignored. Default 5 MB. */
  maxBytes?: number;
}

/** Camera tile + thumbnails for the "Report a problem" form. */
export function PhotoUploader({ files, onChange, max = 3, maxBytes = 5 * 1024 * 1024 }: PhotoUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const previews = useMemo(() => files.map((f) => URL.createObjectURL(f)), [files]);
  useEffect(() => () => previews.forEach((u) => URL.revokeObjectURL(u)), [previews]);

  const onPick = (list: FileList | null) => {
    if (!list) return;
    const accepted = [...list].filter((f) => f.type.startsWith("image/") && f.size <= maxBytes);
    onChange([...files, ...accepted].slice(0, max));
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="flex flex-wrap gap-2">
      {previews.map((url, i) => (
        <div key={url} className="relative size-16 overflow-hidden rounded-md bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt={`Photo ${i + 1}`} className="size-full object-cover" />
          <button
            type="button"
            onClick={() => onChange(files.filter((_, idx) => idx !== i))}
            aria-label={`Remove photo ${i + 1}`}
            className="absolute right-0.5 top-0.5 flex size-5 items-center justify-center rounded-full bg-black/60 text-white"
          >
            <CloseIcon size={12} />
          </button>
        </div>
      ))}
      {files.length < max && (
        <>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            aria-label="Add a photo"
            className="flex size-16 items-center justify-center rounded-md border border-dashed border-line-strong bg-surface text-primary hover:bg-primary-light"
          >
            <CameraIcon size={22} />
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={(e) => onPick(e.target.files)}
          />
        </>
      )}
    </div>
  );
}
