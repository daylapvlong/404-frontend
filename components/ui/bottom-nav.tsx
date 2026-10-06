import type { ComponentType, ElementType } from "react";
import {
  CalendarIcon, HomeIcon, ListIcon, LoginIcon, MapIcon, UserIcon, type IconProps,
} from "./icons";
import { cn } from "./cn";

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: ComponentType<IconProps>;
}

/** Signed-in navigation (5 tabs). */
export const MEMBER_NAV: NavItem[] = [
  { id: "home", label: "Home", href: "/", icon: HomeIcon },
  { id: "book", label: "Book", href: "/book", icon: CalendarIcon },
  { id: "bookings", label: "My bookings", href: "/bookings", icon: ListIcon },
  { id: "map", label: "Map", href: "/map", icon: MapIcon },
  { id: "profile", label: "Profile", href: "/profile", icon: UserIcon },
];

/** Signed-out navigation (3 tabs). */
export const GUEST_NAV: NavItem[] = [
  { id: "home", label: "Home", href: "/", icon: HomeIcon },
  { id: "map", label: "Map", href: "/map", icon: MapIcon },
  { id: "login", label: "Log in", href: "/login", icon: LoginIcon },
];

export interface BottomNavProps {
  items?: NavItem[];
  /** id of the active item */
  activeId: string;
  /** Pass next/link here so navigation is client-side: LinkComponent={Link} */
  LinkComponent?: ElementType;
  className?: string;
}

export function BottomNav({ items = MEMBER_NAV, activeId, LinkComponent = "a", className }: BottomNavProps) {
  return (
    <nav
      aria-label="Main"
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface pb-[env(safe-area-inset-bottom)]",
        className,
      )}
    >
      <ul className="mx-auto flex max-w-xl justify-around px-2 py-2">
        {items.map(({ id, label, href, icon: Icon }) => {
          const active = id === activeId;
          return (
            <li key={id} className="flex-1">
              <LinkComponent
                href={href}
                aria-current={active ? "page" : undefined}
                className="flex flex-col items-center gap-1 text-[11px] leading-none"
              >
                <span
                  className={cn(
                    "flex h-8 w-14 items-center justify-center rounded-full transition-colors",
                    active ? "bg-primary-light text-on-primary-light" : "text-fg-secondary",
                  )}
                >
                  <Icon size={20} />
                </span>
                <span className={active ? "font-semibold text-on-primary-light" : "text-fg-secondary"}>
                  {label}
                </span>
              </LinkComponent>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
