"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import saxionLogo from "@/components/saxion-logo.jpg";
import {
  Avatar,
  BottomNav,
  BottomSheet,
  CampusPill,
  NextBookingCard,
  RoomTile,
  SectionHeader,
  TopBar,
  WeeklyLimitCard,
} from "@/components/ui";

/* ---------- placeholder data: replace with real queries ---------- */
const CAMPUSES = ["Deventer", "Enschede", "Almelo"];

const NAV = [
  { id: "home", label: "Home", href: "/" },
  { id: "book", label: "Book a room", href: "/book" },
  { id: "bookings", label: "My bookings", href: "/bookings" },
  { id: "map", label: "Map", href: "/map" },
  { id: "profile", label: "Profile", href: "/profile" },
];

const ROOMS = [ //NEEDS TO BE REPLACED WITH REAL DATA
  { id: 1, roomNumber: "B2.06", meta: "Study room · 8 seats" },
  { id: 2, roomNumber: "A2.04", meta: "Meeting room · 4 seats" },
  { id: 3, roomNumber: "C1.03", meta: "Study room · 6 seats" },
  { id: 4, roomNumber: "D3.26", meta: "Study room · 12 seats" },
  { id: 5, roomNumber: "A1.01", meta: "Meeting room · 4 seats" },
];

export default function HomePage() {
  const [campus, setCampus] = useState("Deventer");
  const [campusOpen, setCampusOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [checkedIn, setCheckedIn] = useState(false);

  const rooms = ROOMS.filter((r) => r.roomNumber.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <div className="min-h-dvh lg:pl-56">
      {/* ---------- Mobile / tablet: top bar ---------- */}
      <TopBar
        title="RoomNotFound"
        className="lg:hidden"
        trailing={<CampusPill campus={campus} onClick={() => setCampusOpen(true)} />}
      />

      {/* ---------- Desktop: sidebar ---------- */}
      <aside className="fixed inset-y-0 left-0 hidden w-56 flex-col border-r border-line bg-surface p-4 lg:flex">
      <Image
        src={saxionLogo}
        alt="Saxion University of Applied Sciences"
        priority
        className="h-15 w-auto self-start"
      />
        <div className="mt-6 flex flex-col gap-1">
          <label htmlFor="campus" className="text-[11px] text-fg-secondary">Campus</label>
          <select
            id="campus"
            value={campus}
            onChange={(e) => setCampus(e.target.value)}
            className="h-10 w-full rounded-md border border-line-strong bg-surface px-3 text-sm"
          >
            {CAMPUSES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>

        <nav aria-label="Main" className="mt-6 flex flex-col gap-1 border-t border-line pt-4">
          {NAV.map((item) => {
            const active = item.id === "home";
            return (
              <Link
                key={item.id}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={
                  "rounded-md px-3 py-2 text-sm " +
                  (active
                    ? "bg-primary-light font-semibold text-on-primary-light"
                    : "text-fg hover:bg-page")
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button type="button" className="mt-auto self-start text-xs underline hover:text-primary">
          Log out
        </button>
      </aside>

      {/* ---------- Desktop: top strip with profile ---------- */}
      <header className="hidden h-16 items-center justify-end border-b border-line bg-surface px-6 lg:flex">
        <Link href="/profile" aria-label="Profile">
          <Avatar name="Bahar" size="md" />
        </Link>
      </header>

      {/* ---------- Content ---------- */}
      <main className="mx-auto max-w-6xl px-4 pb-28 pt-5 lg:px-6 lg:pb-10 lg:pt-6">
        <h1 className="text-2xl font-semibold">Home</h1>

        <div className="mt-4 grid gap-4 lg:grid-cols-[2fr_1fr]">
          <NextBookingCard
            booking={{
              roomNumber: "A2.02",
              building: "Deventer, School Building",
              locationLine: "Wing A, Floor 2 · Meeting room",
              whenLine: "Today 13:00 – 14:30",
              checkInHint: checkedIn ? undefined : "Check in before 13:15",
            }}
            onCheckIn={() => setCheckedIn(true)}
            onBookRoom={() => {}}
          />
          <WeeklyLimitCard usedMinutes={90} limitMinutes={270} resetsOn="Mon" />
        </div>

        <hr className="my-6 border-line-strong" />

        <div className="flex flex-col gap-1">
          <label htmlFor="room-search" className="sr-only">Search room name</label>
          <input
            id="room-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search room name, e.g. B2.07"
            className="h-10 w-full max-w-lg rounded-md border border-line-strong bg-surface px-3 text-sm placeholder:text-fg-disabled focus:border-line-focus"
          />
        </div>

        <section className="mt-6 flex flex-col gap-3">
          <SectionHeader title="Rooms" href="/rooms" LinkComponent={Link} />
          {rooms.length > 0 ? (
            // *:w-full lets each tile fill its grid cell
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 *:w-full">
              {rooms.map((r) => (
                <RoomTile
                  key={r.id}
                  roomNumber={r.roomNumber}
                  meta={r.meta}
                  href={`/rooms/${r.roomNumber}`}
                  LinkComponent={Link}
                />
              ))}
            </div>
          ) : (
            <p className="text-sm text-fg-secondary">No rooms match “{query}”.</p>
          )}
        </section>
      </main>

      {/* ---------- Mobile / tablet: bottom nav + campus picker ---------- */}
      <BottomNav activeId="home" LinkComponent={Link} className="lg:hidden" />

      <BottomSheet open={campusOpen} onClose={() => setCampusOpen(false)} title="Choose campus">
        <ul className="flex flex-col gap-1">
          {CAMPUSES.map((c) => (
            <li key={c}>
              <button
                type="button"
                onClick={() => { setCampus(c); setCampusOpen(false); }}
                aria-pressed={c === campus}
                className={
                  "w-full rounded-md px-3 py-3 text-left text-sm " +
                  (c === campus ? "bg-primary-light font-semibold text-on-primary-light" : "hover:bg-page")
                }
              >
                {c}
              </button>
            </li>
          ))}
        </ul>
      </BottomSheet>
    </div>
  );
}
