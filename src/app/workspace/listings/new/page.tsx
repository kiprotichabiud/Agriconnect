import Link from "next/link";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { Container } from "@/components/shared/container";
import { LoadingState } from "@/components/shared/feedback-states";
import { ListingForm } from "@/features/listings/components/listing-form";
import { createListingAction } from "@/features/listings/actions";
import { getFarmerContext } from "@/features/listings/server-context";

export const metadata = { title: "Create Produce Listing | AgriConnect" };

async function NewProduceListingContent() {
  const context = await getFarmerContext();
  if (context.status === "signed-out") redirect("/sign-in");
  if (context.status === "no-profile") redirect("/onboarding");
  if (context.status === "forbidden") redirect("/workspace?error=farmer-only");

  return (
    <main className="flex-1 py-10 sm:py-14">
      <Container className="max-w-3xl">
        <Link className="inline-flex min-h-11 items-center text-sm font-medium text-muted-foreground hover:text-primary" href="/workspace/listings">← Back to listings</Link>
        <section className="mt-5 rounded-2xl border bg-card p-5 shadow-[var(--shadow-card)] sm:p-8">
          <p className="text-sm font-medium text-primary">Farmer workspace</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">Create a produce listing</h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">Enter accurate details so buyers can understand what is available. Prices are in Kenyan shillings (KES).</p>
          {context.status === "unavailable" ? (
            <p className="mt-6 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive" role="alert">Listings are temporarily unavailable. Please try again later.</p>
          ) : (
            <div className="mt-7"><ListingForm action={createListingAction} submitLabel="Publish listing" /></div>
          )}
        </section>
      </Container>
    </main>
  );
}

export default function NewProduceListingPage() {
  return (
    <Suspense fallback={<main className="flex-1 py-12"><Container><LoadingState label="Loading listing form…" /></Container></main>}>
      <NewProduceListingContent />
    </Suspense>
  );
}
