"use server";

import type { ListingStatus } from "@/generated/prisma/client";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { formDataToListingInput, listingInputSchema } from "@/features/listings/schema";
import { createFarmerListing, updateFarmerListing, updateFarmerListingStatus } from "@/features/listings/service";
import { getFarmerContext } from "@/features/listings/server-context";
import type { ListingFormState } from "@/features/listings/types";

export async function createListingAction(
  _previousState: ListingFormState,
  formData: FormData,
): Promise<ListingFormState> {
  const context = await getFarmerContext();
  if (context.status !== "ok") return { error: contextMessage(context.status) };

  const parsed = listingInputSchema.safeParse(formDataToListingInput(formData));
  if (!parsed.success) {
    return {
      error: "Review the highlighted fields and correct any invalid details.",
      fieldErrors: Object.fromEntries(
        parsed.error.issues.map((issue) => [String(issue.path[0]), issue.message]),
      ),
    };
  }

  try {
    await createFarmerListing(context.database, context.farmerId, parsed.data);
  } catch {
    console.error("Failed to create a produce listing.");
    return { error: "We could not save this listing. Please try again." };
  }

  revalidatePath("/workspace/listings");
  redirect("/workspace/listings?created=1");
}

export async function editListingAction(
  id: string,
  _previousState: ListingFormState,
  formData: FormData,
): Promise<ListingFormState> {
  const context = await getFarmerContext();
  if (context.status !== "ok") return { error: contextMessage(context.status) };

  const parsed = listingInputSchema.safeParse(formDataToListingInput(formData));
  if (!parsed.success) {
    return {
      error: "Review the highlighted fields and correct any invalid details.",
      fieldErrors: Object.fromEntries(
        parsed.error.issues.map((issue) => [String(issue.path[0]), issue.message]),
      ),
    };
  }

  try {
    const listing = await updateFarmerListing(context.database, context.farmerId, id, parsed.data);
    if (!listing) return { error: "This listing is unavailable or can no longer be edited." };
  } catch {
    console.error("Failed to update a produce listing.");
    return { error: "We could not update this listing. Please try again." };
  }

  revalidatePath("/workspace/listings");
  revalidatePath(`/workspace/listings/${id}/edit`);
  redirect("/workspace/listings?updated=1");
}

export async function changeListingStatusAction(formData: FormData): Promise<void> {
  const context = await getFarmerContext();
  if (context.status !== "ok") redirect("/workspace/listings?error=unauthorized");

  const id = formData.get("listingId");
  const statusValue = formData.get("status");
  const allowedStatuses = ["ACTIVE", "PAUSED", "SOLD_OUT", "CLOSED"] as const;

  if (typeof id !== "string" || id.length > 100 || !allowedStatuses.includes(statusValue as (typeof allowedStatuses)[number])) {
    redirect("/workspace/listings?error=invalid");
  }

  let result: "updated" | "not-found" | "invalid-transition" | "conflict";
  try {
    result = await updateFarmerListingStatus(
      context.database,
      context.farmerId,
      id,
      statusValue as (typeof ListingStatus)[keyof typeof ListingStatus],
    );
  } catch {
    console.error("Failed to change a produce listing status.");
    redirect("/workspace/listings?error=unavailable");
  }

  if (result !== "updated") {
    const error = result === "not-found" ? "unavailable" : result === "conflict" ? "conflict" : "transition";
    redirect(`/workspace/listings?error=${error}`);
  }

  revalidatePath("/workspace/listings");
}

function contextMessage(status: "unavailable" | "signed-out" | "no-profile" | "forbidden") {
  if (status === "signed-out") return "Sign in to manage produce listings.";
  if (status === "forbidden") return "Only farmer accounts can manage produce listings.";
  if (status === "no-profile") return "Complete account setup before managing listings.";
  return "Listings are temporarily unavailable. Please try again later.";
}
