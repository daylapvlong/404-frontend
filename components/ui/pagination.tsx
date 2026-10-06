"use client";

import { cn } from "./cn";

export interface PaginationProps {
  page: number; // 1-based
  pageCount: number;
  onChange: (page: number) => void;
}

function pages(page: number, count: number): Array<number | "gap"> {
  if (count <= 7) return Array.from({ length: count }, (_, i) => i + 1);
  const set = new Set([1, count, page - 1, page, page + 1]);
  const sorted = [...set].filter((n) => n >= 1 && n <= count).sort((a, b) => a - b);
  const out: Array<number | "gap"> = [];
  sorted.forEach((n, i) => {
    if (i > 0 && n - sorted[i - 1] > 1) out.push("gap");
    out.push(n);
  });
  return out;
}

export function Pagination({ page, pageCount, onChange }: PaginationProps) {
  if (pageCount <= 1) return null;
  return (
    <nav aria-label="Pagination" className="flex items-center gap-2">
      {pages(page, pageCount).map((p, i) =>
        p === "gap" ? (
          <span key={`g${i}`} className="px-1 text-fg-secondary" aria-hidden="true">…</span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            aria-label={`Page ${p}`}
            aria-current={p === page ? "page" : undefined}
            className={cn(
              "size-9 rounded-md border text-xs",
              p === page
                ? "border-primary bg-primary font-medium text-on-primary"
                : "border-line-strong bg-surface hover:bg-page",
            )}
          >
            {p}
          </button>
        ),
      )}
    </nav>
  );
}
