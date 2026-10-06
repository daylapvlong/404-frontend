import type { Metadata, Viewport } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // normal, medium, semibold, bold (used in Figma)
  variable: "--font-figtree",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RoomNotFound",
  description: "Find and book a room on campus",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover", // lets bottom sheets / nav use safe-area insets
  themeColor: "#007a66", // brand-700
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={figtree.variable}>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
