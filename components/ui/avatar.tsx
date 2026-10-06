import { cn } from "./cn";

export interface AvatarProps {
  /** app_user.display_name – the first letter is shown */
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = { sm: "size-5 text-[10px]", md: "size-8 text-sm", lg: "size-12 text-lg" } as const;

export function Avatar({ name, size = "md", className }: AvatarProps) {
  const initial = name.trim().charAt(0).toUpperCase() || "?";
  return (
    <span
      role="img"
      aria-label={name}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full bg-primary-light font-semibold text-on-primary-light",
        sizes[size],
        className,
      )}
    >
      {initial}
    </span>
  );
}
