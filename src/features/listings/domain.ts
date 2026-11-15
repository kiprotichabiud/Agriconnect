import type { ListingStatus, UserRole } from "@/generated/prisma/client";

export function canManageListings(role: UserRole): boolean {
  return role === "FARMER";
}

export function effectiveListingStatus(
  status: ListingStatus,
  availableUntil: Date | null,
  now = new Date(),
): ListingStatus {
  if (status !== "ACTIVE" && status !== "PAUSED") return status;
  if (!availableUntil) return status;

  const expiryDate = availableUntil.toISOString().slice(0, 10);
  const todayParts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Nairobi",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const today = `${todayParts.find((part) => part.type === "year")?.value}-${todayParts.find((part) => part.type === "month")?.value}-${todayParts.find((part) => part.type === "day")?.value}`;

  return expiryDate < today ? "EXPIRED" : status;
}

export function canTransitionListingStatus(
  current: ListingStatus,
  next: ListingStatus,
): boolean {
  const transitions: Record<ListingStatus, ListingStatus[]> = {
    ACTIVE: ["PAUSED", "SOLD_OUT", "CLOSED"],
    PAUSED: ["ACTIVE", "SOLD_OUT", "CLOSED"],
    SOLD_OUT: ["CLOSED"],
    EXPIRED: ["CLOSED"],
    CLOSED: [],
  };

  return transitions[current].includes(next);
}
