import { describe, expect, it } from "vitest";
import { listingInputSchema } from "@/features/listings/schema";

const validListing = {
  produceName: "Tomatoes",
  variety: "Roma",
  description: "Freshly harvested tomatoes.",
  quantity: "25.5",
  unit: "KG",
  pricePerUnit: "80.25",
  county: "Kirinyaga",
  collectionArea: "Kerugoya",
  availableFrom: "2026-11-14",
  availableUntil: "2026-11-20",
};

describe("listingInputSchema", () => {
  it("accepts valid listing details and supported units", () => {
    expect(listingInputSchema.safeParse(validListing).success).toBe(true);
  });

  it("rejects unsupported units and invalid decimal precision", () => {
    expect(listingInputSchema.safeParse({ ...validListing, unit: "TONNE" }).success).toBe(false);
    expect(listingInputSchema.safeParse({ ...validListing, quantity: "1.2345" }).success).toBe(false);
    expect(listingInputSchema.safeParse({ ...validListing, pricePerUnit: "10.999" }).success).toBe(false);
  });

  it("rejects zero or negative quantity and price", () => {
    expect(listingInputSchema.safeParse({ ...validListing, quantity: "0" }).success).toBe(false);
    expect(listingInputSchema.safeParse({ ...validListing, pricePerUnit: "-1" }).success).toBe(false);
  });

  it("rejects invalid calendar dates and an end date before the start date", () => {
    expect(listingInputSchema.safeParse({ ...validListing, availableFrom: "2026-02-30" }).success).toBe(false);
    expect(listingInputSchema.safeParse({ ...validListing, availableUntil: "2026-11-13" }).success).toBe(false);
  });

  it("accepts blank optional end date, variety and description fields", () => {
    expect(listingInputSchema.safeParse({ ...validListing, availableUntil: "", variety: "", description: "" }).success).toBe(true);
  });
});
