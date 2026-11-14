import Link from "next/link";
import { ArrowRight, Handshake, Search, Sprout } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { buttonVariants } from "@/components/ui/button";

export const metadata = {
  title: "How It Works | AgriConnect",
  description: "Learn how AgriConnect connects farmers and buyers.",
};

const steps = [
  { icon: Sprout, title: "Farmers list available produce", description: "Farmers share details such as produce type, quantity, location and availability." },
  { icon: Search, title: "Buyers discover and request produce", description: "Buyers explore listings and can submit a request for produce they are interested in." },
  { icon: Handshake, title: "Farmers review requests", description: "Farmers review each request and accept or reject it based on their availability." },
];

export default function HowItWorksPage() {
  return (
    <main className="flex-1 py-16 sm:py-24">
      <Container>
        <SectionHeading centered eyebrow="How it works" title="From available produce to a clear request" description="AgriConnect is designed to make the steps between farmers and buyers easier to understand." />
        <ol className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, description }, index) => (
            <li className="rounded-2xl border bg-white p-6 shadow-[var(--shadow-card)]" key={title}>
              <span className="grid size-12 place-items-center rounded-xl bg-secondary text-primary"><Icon aria-hidden="true" className="size-6" /></span>
              <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Step {index + 1}</p>
              <h2 className="mt-2 text-lg font-semibold">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
            </li>
          ))}
        </ol>
        <p className="mx-auto mt-8 max-w-3xl rounded-xl border border-accent/50 bg-[#FBF7ED] p-4 text-center text-sm leading-6">A listing or recommendation is not a confirmed sale. A purchase request becomes an order only when the farmer accepts it.</p>
        <div className="mt-9 flex justify-center"><Link className={buttonVariants({ size: "lg" })} href="/marketplace">Explore Produce <ArrowRight aria-hidden="true" /></Link></div>
      </Container>
    </main>
  );
}
