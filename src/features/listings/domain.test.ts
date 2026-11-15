import { describe, expect, it } from "vitest";
import { canManageListings, canTransitionListingStatus, effectiveListingStatus } from "@/features/listings/domain";

describe("listing permissions and status", () => {
  it("allows only farmers to manage listings", () => {
    expect(canManageListings("FARMER")).toBe(true);
    expect(canManageListings("BUYER")).toBe(false);
  });

  it("derives expiration after the available-until calendar day", () => {
    const date = new Date("2026-05-10T00:00:00.000Z");
    expect(effectiveListingStatus("ACTIVE", date, new Date("2026-05-10T20:59:00.000Z"))).toBe("ACTIVE");
    expect(effectiveListingStatus("PAUSED", date, new Date("2026-05-10T21:00:00.000Z"))).toBe("EXPIRED");
  });

  it("allows the defined farmer status transitions only", () => {
    expect(canTransitionListingStatus("ACTIVE", "PAUSED")).toBe(true);
    expect(canTransitionListingStatus("PAUSED", "ACTIVE")).toBe(true);
    expect(canTransitionListingStatus("SOLD_OUT", "ACTIVE")).toBe(false);
    expect(canTransitionListingStatus("CLOSED", "PAUSED")).toBe(false);
  });
});
