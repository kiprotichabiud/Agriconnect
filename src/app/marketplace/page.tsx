import Link from "next/link";
import { ArrowRight, Sprout } from "lucide-react";
import { Container } from "@/components/shared/container";
import { EmptyState } from "@/components/shared/feedback-states";
import { buttonVariants } from "@/components/ui/button";

export const metadata = {
  title: "Explore Produce | AgriConnect",
  description: "Preview how produce discovery will work on AgriConnect.",
};

export default function MarketplacePage() {
  return (
    <main className="flex-1 py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-secondary text-primary"><Sprout aria-hidden="true" className="size-7" /></span>
          <p className="mt-6 text-sm font-semibold text-primary">Explore Produce</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">A place to discover available produce</h1>
          <p className="mt-5 text-base leading-7 text-muted-foreground">The AgriConnect marketplace is being prepared. This page does not yet contain live listings or search.</p>
          <div className="mt-8"><Link className={buttonVariants({ size: "lg" })} href="/sign-up">Get started <ArrowRight aria-hidden="true" /></Link></div>
        </div>
        <div className="mx-auto mt-14 max-w-2xl">
          <EmptyState title="No live listings yet" description="Produce shown on the homepage is sample content for illustration only. No current listing availability or prices are represented here." />
        </div>
      </Container>
    </main>
  );
}
