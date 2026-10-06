/**
 * Prop-level types named after the ERD columns they are fed from.
 * Components stay presentational: map your DB rows to these in the page/loader.
 *
 * NOTE: the ERD stores `status` columns as varchar, so the unions below are
 * assumptions. Adjust them to the values your backend really uses.
 */

/** room.status */
export type RoomStatus = "available" | "out_of_service" | "retired";

/** booking.status */
export type BookingStatus =
  | "pending_approval"
  | "confirmed"
  | "checked_in"
  | "cancelled"
  | "completed";

/** Fields shown on a room (room + building + location + room_category). */
export interface RoomSummary {
  id: number;
  /** room.room_number, e.g. "D3.35" */
  roomNumber: string;
  /** room_category.name, e.g. "Meeting room" */
  categoryName: string;
  /** room.capacity */
  capacity: number;
  /** room.floor_level */
  floorLevel: number;
  /** building.name, e.g. "School Building" */
  buildingName: string;
  /** location.name, e.g. "Deventer" */
  locationName: string;
  /** Free text such as "Wing D" (from room.name) */
  wing?: string;
  /** URL for the first room_photo (sorted by sort_order) */
  photoUrl?: string;
}

/** "Deventer, School Building" */
export function formatBuilding(room: Pick<RoomSummary, "locationName" | "buildingName">) {
  return `${room.locationName}, ${room.buildingName}`;
}

/** "Wing D, Floor 3" */
export function formatFloor(room: Pick<RoomSummary, "wing" | "floorLevel">) {
  return [room.wing, `Floor ${room.floorLevel}`].filter(Boolean).join(", ");
}
