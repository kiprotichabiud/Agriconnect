import Link from "next/link";
import { ArrowLeft, MapPin, Plus } from "lucide-react";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/shared/container";
import { EmptyState, ErrorState, LoadingState } from "@/components/shared/feedback-states";
import { changeListingStatusAction } from "@/features/listings/actions";
import { effectiveListingStatus } from "@/features/listings/domain";
import { listFarmerListings } from "@/features/listings/service";
import { getFarmerContext } from "@/features/listings/server-context";
import { PRODUCE_UNIT_LABELS } from "@/features/listings/schema";

const statusLabels = {
  ACTIVE: "Active",
  PAUSED: "Paused",
  SOLD_OUT: "Sold out",
  EXPIRED: "Expired",
  CLOSED: "Closed",
} as const;

const statusStyles = {
  ACTIVE: "border-success/20 bg-success/10 text-success",
  PAUSED: "border-warning/20 bg-warning/10 text-warning",
  SOLD_OUT: "border-border bg-muted text-muted-foreground",
  EXPIRED: "border-border bg-muted text-muted-foreground",
  CLOSED: "border-border bg-muted text-muted-foreground",
} as const;

function StatusBadge({ status }: { status: keyof typeof statusLabels }) {
  return <Badge className={statusStyles[status]}>{statusLabels[status]}</Badge>;
}

function StatusActions({ listingId, status }: { listingId: string; status: keyof typeof statusLabels }) {
  if (status === "CLOSED") return null;

  const actions = status === "ACTIVE"
    ? [{ value: "PAUSED", label: "Pause" }, { value: "SOLD_OUT", label: "Mark sold out" }, { value: "CLOSED", label: "Close listing" }]
    : status === "PAUSED"
      ? [{ value: "ACTIVE", label: "Resume" }, { value: "SOLD_OUT", label: "Mark sold out" }, { value: "CLOSED", label: "Close listing" }]
      : [{ value: "CLOSED", label: "Close listing" }];

  return (
    <div className="flex flex-wrap gap-2">
      {actions.map(({ value, label }) => (
        <form action={changeListingStatusAction} key={value}>
          <input type="hidden" name="listingId" value={listingId} />
          <input type="hidden" name="status" value={value} />
          <Button type="submit" variant="outline" size="sm">{label}</Button>
        </form>
      ))}
    </div>
  );
}

function statusNotice(code?: string) {
  const notices: Record<string, { title: string; description: string }> = {
    created: { title: "Listing created", description: "Your new listing is active and saved to your account." },
    updated: { title: "Listing updated", description: "Your changes have been saved." },
  };
  const errors: Record<string, { title: string; description: string }> = {
    unauthorized: { title: "Action unavailable", description: "Sign in with a farmer account to manage listings." },
    unavailable: { title: "Could not update listing", description: "Please try again later." },
    invalid: { title: "Invalid listing action", description: "Refresh the page and choose an available action." },
    conflict: { title: "Listing changed", description: "The listing changed while you were updating it. Refresh and try again." },
    transition: { title: "Action not available", description: "That status change is not allowed for this listing." },
  };

  if (code && notices[code]) return <p className="rounded-xl border border-success/20 bg-success/5 p-4 text-sm text-success" role="status">{notices[code].description}</p>;
  if (code && errors[code]) return <ErrorState {...errors[code]} />;
  return null;
}

async function FarmerListingsContent({
  searchParams,
}: {
  searchParams: Promise<{ created?: string; updated?: string; error?: string }>;
}) {
  const context = await getFarmerContext();
  if (context.status === "signed-out") redirect("/sign-in");
  if (context.status === "no-profile") redirect("/onboarding");
  if (context.status === "forbidden") redirect("/workspace?error=farmer-only");

  const params = await searchParams;
  const notice = params.error ?? (params.created ? "created" : params.updated ? "updated" : undefined);

  if (context.status === "unavailable") {
    return <main className="flex-1 py-12"><Container><ErrorState title="Listings are unavailable" description="We could not load your account or listings. Please try again later." /></Container></main>;
  }

  let listings;
  try {
    listings = await listFarmerListings(context.database, context.farmerId);
  } catch {
    console.error("Failed to load farmer listings.");
    return <main className="flex-1 py-12"><Container><ErrorState title="Could not load listings" description="Please try again later." /></Container></main>;
  }

  return (
    <main className="flex-1 py-10 sm:py-14">
      <Container>
        <Link className="mb-6 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary" href="/workspace"><ArrowLeft aria-hidden="true" className="size-4" />My account</Link>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-medium text-primary">Farmer workspace</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">Your produce listings</h1>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">Create and manage produce you have available for buyers.</p>
          </div>
          <Link className={buttonVariants({ size: "lg" })} href="/workspace/listings/new"><Plus aria-hidden="true" />Create listing</Link>
        </div>
        <div className="mt-6">{statusNotice(notice)}</div>
        {listings.length === 0 ? (
          <div className="mt-8"><EmptyState title="No listings yet" description="Add your first produce listing to keep its details and availability in one place." /><div className="mt-5 flex justify-center"><Link className={buttonVariants()} href="/workspace/listings/new">Create your first listing</Link></div></div>
        ) : (
          <div className="mt-8 grid gap-4">
            {listings.map((listing) => {
              const status = effectiveListingStatus(listing.status, listing.availableUntil);
              return (
                <Card key={listing.id}>
                  <CardContent className="flex flex-col gap-5 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-3"><h2 className="text-lg font-semibold">{listing.produceName}</h2><StatusBadge status={status} /></div>
                      {listing.variety ? <p className="mt-1 text-sm text-muted-foreground">{listing.variety}</p> : null}
                      <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground"><span>{listing.quantity.toString()} {PRODUCE_UNIT_LABELS[listing.unit]} available</span><span>KES {listing.pricePerUnit.toFixed(2)} / {PRODUCE_UNIT_LABELS[listing.unit]}</span><span className="inline-flex items-center gap-1"><MapPin aria-hidden="true" className="size-4" />{listing.collectionArea}, {listing.county}</span></p>
                      <p className="mt-2 text-xs text-muted-foreground">Available from {listing.availableFrom.toISOString().slice(0, 10)}{listing.availableUntil ? ` until ${listing.availableUntil.toISOString().slice(0, 10)}` : ""}</p>
                    </div>
                    <div className="flex flex-col gap-3 lg:items-end">
                      {status !== "CLOSED" ? <Link className={buttonVariants({ variant: "outline", size: "sm" })} href={`/workspace/listings/${listing.id}/edit`}>Edit details</Link> : null}
                      <StatusActions listingId={listing.id} status={status} />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </Container>
    </main>
  );
}

export default function FarmerListingsPage({
  searchParams,
}: {
  searchParams: Promise<{ created?: string; updated?: string; error?: string }>;
}) {
  return (
    <Suspense fallback={<main className="flex-1 py-10"><Container><LoadingState label="Loading your listings…" /></Container></main>}>
      <FarmerListingsContent searchParams={searchParams} />
    </Suspense>
  );
}
