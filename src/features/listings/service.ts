import "server-only";

import { Prisma, type PrismaClient, type ListingStatus } from "@/generated/prisma/client";
import { canTransitionListingStatus, effectiveListingStatus } from "@/features/listings/domain";
import { toUtcDate, type ListingInput } from "@/features/listings/schema";

function listingData(input: ListingInput) {
  return {
    produceName: input.produceName,
    variety: input.variety || null,
    description: input.description || null,
    quantity: new Prisma.Decimal(input.quantity),
    unit: input.unit,
    pricePerUnit: new Prisma.Decimal(input.pricePerUnit),
    currency: "KES",
    county: input.county,
    collectionArea: input.collectionArea,
    availableFrom: toUtcDate(input.availableFrom),
    availableUntil: input.availableUntil ? toUtcDate(input.availableUntil) : null,
  };
}

export function listFarmerListings(database: PrismaClient, farmerId: string) {
  return database.produceListing.findMany({
    where: { farmerId },
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
  });
}

export function getFarmerListing(database: PrismaClient, farmerId: string, id: string) {
  return database.produceListing.findFirst({ where: { id, farmerId } });
}

export function createFarmerListing(
  database: PrismaClient,
  farmerId: string,
  input: ListingInput,
) {
  return database.produceListing.create({
    data: { ...listingData(input), farmerId, status: "ACTIVE" },
  });
}

export async function updateFarmerListing(
  database: PrismaClient,
  farmerId: string,
  id: string,
  input: ListingInput,
) {
  const result = await database.produceListing.updateMany({
    where: { id, farmerId, status: { not: "CLOSED" } },
    data: listingData(input),
  });

  if (result.count !== 1) return null;
  return getFarmerListing(database, farmerId, id);
}

export async function updateFarmerListingStatus(
  database: PrismaClient,
  farmerId: string,
  id: string,
  nextStatus: ListingStatus,
): Promise<"updated" | "not-found" | "invalid-transition" | "conflict"> {
  const listing = await getFarmerListing(database, farmerId, id);
  if (!listing) return "not-found";

  const currentStatus = effectiveListingStatus(listing.status, listing.availableUntil);
  if (!canTransitionListingStatus(currentStatus, nextStatus)) return "invalid-transition";

  const result = await database.produceListing.updateMany({
    where: { id, farmerId, status: listing.status },
    data: { status: nextStatus },
  });

  return result.count === 1 ? "updated" : "conflict";
}
