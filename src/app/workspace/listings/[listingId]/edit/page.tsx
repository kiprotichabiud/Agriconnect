import Link from "next/link";
import { Suspense } from "react";
import { notFound, redirect } from "next/navigation";
import { Container } from "@/components/shared/container";
import { ErrorState, LoadingState } from "@/components/shared/feedback-states";
import { ListingForm } from "@/features/listings/components/listing-form";
import { editListingAction } from "@/features/listings/actions";
import { getFarmerListing } from "@/features/listings/service";
import { getFarmerContext } from "@/features/listings/server-context";

export const metadata = { title: "Edit Produce Listing | AgriConnect" };

async function EditProduceListingContent({
  params,
}: {
  params: Promise<{ listingId: string }>;
}) {
  const context = await getFarmerContext();
  if (context.status === "signed-out") redirect("/sign-in");
  if (context.status === "no-profile") redirect("/onboarding");
  if (context.status === "forbidden") redirect("/workspace?error=farmer-only");
  if (context.status === "unavailable") {
    return <main className="flex-1 py-12"><Container><ErrorState title="Listings are unavailable" description="We could not load your account. Please try again later." /></Container></main>;
  }

  const { listingId } = await params;
  let listing;
  try {
    listing = await getFarmerListing(context.database, context.farmerId, listingId);
  } catch {
    console.error("Failed to load a produce listing for editing.");
    return <main className="flex-1 py-12"><Container><ErrorState title="Could not load listing" description="Please try again later." /></Container></main>;
  }

  if (!listing) notFound();

  return (
    <main className="flex-1 py-10 sm:py-14">
      <Container className="max-w-3xl">
        <Link className="inline-flex min-h-11 items-center text-sm font-medium text-muted-foreground hover:text-primary" href="/workspace/listings">← Back to listings</Link>
        <section className="mt-5 rounded-2xl border bg-card p-5 shadow-[var(--shadow-card)] sm:p-8">
          <p className="text-sm font-medium text-primary">Farmer workspace</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">Edit {listing.produceName}</h1>
          {listing.status === "CLOSED" ? (
            <p className="mt-5 rounded-lg border bg-muted p-4 text-sm text-muted-foreground">Closed listings cannot be edited. Create a new listing if this produce becomes available again.</p>
          ) : (
            <div className="mt-7"><ListingForm
              action={editListingAction.bind(null, listing.id)}
              submitLabel="Save changes"
              initialValues={{
                produceName: listing.produceName,
                variety: listing.variety ?? "",
                description: listing.description ?? "",
                quantity: listing.quantity.toString(),
                unit: listing.unit,
                pricePerUnit: listing.pricePerUnit.toString(),
                county: listing.county,
                collectionArea: listing.collectionArea,
                availableFrom: listing.availableFrom.toISOString().slice(0, 10),
                availableUntil: listing.availableUntil?.toISOString().slice(0, 10) ?? "",
              }}
            /></div>
          )}
        </section>
      </Container>
    </main>
  );
}

export default function EditProduceListingPage({
  params,
}: {
  params: Promise<{ listingId: string }>;
}) {
  return (
    <Suspense fallback={<main className="flex-1 py-12"><Container><LoadingState label="Loading listing details…" /></Container></main>}>
      <EditProduceListingContent params={params} />
    </Suspense>
  );
}
