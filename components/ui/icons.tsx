import type { SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function make(paths: React.ReactNode, displayName: string) {
  const Icon = ({ size = 20, ...props }: IconProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {paths}
    </svg>
  );
  Icon.displayName = displayName;
  return Icon;
}

export const HomeIcon = make(<><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /></>, "HomeIcon");
export const CalendarIcon = make(<><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></>, "CalendarIcon");
export const ListIcon = make(<path d="M9 6h12M9 12h12M9 18h12M4 6h.01M4 12h.01M4 18h.01" />, "ListIcon");
export const MapIcon = make(<><path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z" /><path d="M9 4v14M15 6v14" /></>, "MapIcon");
export const UserIcon = make(<><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></>, "UserIcon");
export const LoginIcon = make(<><path d="M15 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4" /><path d="M10 8l4 4-4 4M14 12H3" /></>, "LoginIcon");
export const ChevronLeftIcon = make(<path d="m15 18-6-6 6-6" />, "ChevronLeftIcon");
export const ChevronRightIcon = make(<path d="m9 18 6-6-6-6" />, "ChevronRightIcon");
export const ChevronDownIcon = make(<path d="m6 9 6 6 6-6" />, "ChevronDownIcon");
export const ChevronUpIcon = make(<path d="m6 15 6-6 6 6" />, "ChevronUpIcon");
export const CloseIcon = make(<path d="M18 6 6 18M6 6l12 12" />, "CloseIcon");
export const PlusIcon = make(<path d="M12 5v14M5 12h14" />, "PlusIcon");
export const MinusIcon = make(<path d="M5 12h14" />, "MinusIcon");
export const CheckIcon = make(<path d="m5 12.5 4.5 4.5L19 7.5" />, "CheckIcon");
export const NavigateIcon = make(<path d="M21 3 3 10.5l7 3 3 7L21 3Z" />, "NavigateIcon");
export const CameraIcon = make(<><path d="M4 8h3l2-3h6l2 3h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" /><circle cx="12" cy="13.5" r="3.5" /></>, "CameraIcon");
