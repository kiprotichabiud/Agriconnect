import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Eye, Handshake, MapPin, Search, Sprout, Store } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { cn } from "@/lib/utils";

const steps = [
  { icon: Sprout, title: "Farmers list produce", text: "Show what is available, where it is located and when it can be supplied." },
  { icon: Search, title: "Buyers discover it", text: "Explore produce listings and find options that fit your needs." },
  { icon: Handshake, title: "Farmers review requests", text: "Farmers can review buyer requests and confirm availability." },
];

const benefits = [
  { icon: Store, title: "More market access", text: "Give farmers another way to make available produce visible to potential buyers." },
  { icon: Search, title: "Simpler discovery", text: "Help buyers explore what farmers say is available across locations." },
  { icon: Eye, title: "Clear availability", text: "Make produce, location and availability easier to see in one place." },
  { icon: Handshake, title: "Support less avoidable loss", text: "Clearer connections can help produce reach interested buyers. A match or request alone does not mean loss was prevented." },
];

const exampleProduce = [
  { name: "Avocados", county: "Murang’a County", image: "/images/avocados.svg", alt: "Illustration of fresh green avocados", price: "Sample KES 80 / kg" },
  { name: "Maize", county: "Trans Nzoia County", image: "/images/maize.svg", alt: "Illustration of golden maize cobs", price: "Sample KES 55 / kg" },
  { name: "Tomatoes", county: "Kirinyaga County", image: "/images/tomatoes.svg", alt: "Illustration of ripe red tomatoes", price: "Sample KES 90 / kg" },
];

export default function HomePage() {
  return (
    <main className="flex-1">
      <section className="overflow-hidden bg-secondary">
        <Container className="grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1.03fr_0.97fr] lg:gap-12 lg:py-24">
          <div className="max-w-xl">
            <Badge className="border-accent/40 bg-white">A produce marketplace for Kenya</Badge>
            <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-[3.5rem]">
              Connecting Farmers to Buyers. <span className="text-primary">Helping Reduce Avoidable Food Loss.</span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">
              AgriConnect helps farmers showcase available produce and connects buyers with agricultural products they need.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link className={buttonVariants({ size: "lg" })} href="/marketplace">Explore Produce <ArrowRight aria-hidden="true" /></Link>
              <Link className={buttonVariants({ size: "lg", variant: "outline" })} href="/sign-up">Sell Your Produce</Link>
            </div>
            <p className="mt-5 text-xs leading-5 text-muted-foreground">Connections start with clearer visibility. A listing or request is not a confirmed sale.</p>
          </div>
          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -left-6 top-8 size-24 rounded-full bg-accent/30 blur-2xl" aria-hidden="true" />
            <Image src="/images/farm-market.svg" alt="Illustration of a Kenyan farm landscape with crops ready for market" width={720} height={620} priority className="relative w-full rounded-[2rem]" />
            <div className="absolute bottom-5 left-4 rounded-xl border bg-white/95 px-4 py-3 shadow-lg sm:bottom-8 sm:left-8">
              <p className="text-xs text-muted-foreground">Built around</p>
              <p className="mt-1 text-sm font-semibold text-primary">Farmers & buyers in Kenya</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20 lg:py-24" id="how-it-works">
        <Container>
          <SectionHeading centered eyebrow="How AgriConnect works" title="A clearer path from harvest to buyer" description="A straightforward process helps both sides understand what is available and what happens next." />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {steps.map(({ icon: Icon, title, text }, index) => (
              <Card className="relative" key={title}>
                <CardContent className="p-6 sm:p-7">
                  <span className="grid size-12 place-items-center rounded-xl bg-secondary text-primary"><Icon aria-hidden="true" className="size-6" /></span>
                  <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Step {index + 1}</p>
                  <h3 className="mt-2 text-lg font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center"><Link className="inline-flex min-h-11 items-center gap-2 rounded-md px-3 text-sm font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" href="/how-it-works">See how it works <ArrowRight aria-hidden="true" className="size-4" /></Link></div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <Container>
          <SectionHeading eyebrow="Why AgriConnect" title="Useful connections, made easier" description="Better visibility can help farmers and buyers find each other. AgriConnect supports that connection without promising outcomes before a sale is confirmed." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map(({ icon: Icon, title, text }) => (
              <div className="rounded-2xl border bg-background p-6" key={title}>
                <Icon aria-hidden="true" className="size-6 text-primary" />
                <h3 className="mt-4 font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <SectionHeading eyebrow="Explore produce" title="A preview of what discovery can look like" description="These sample cards show the kind of details a listing may include." />
            <Link className={buttonVariants({ variant: "outline", size: "default" })} href="/marketplace">Explore the preview <ArrowRight aria-hidden="true" /></Link>
          </div>
          <div className="mt-8 rounded-xl border border-accent/50 bg-[#FBF7ED] px-4 py-3 text-sm text-foreground" role="note">
            Sample data for illustration only. These are not live listings, prices or availability.
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {exampleProduce.map((produce) => (
              <Card className="overflow-hidden" key={produce.name}>
                <Image src={produce.image} alt={produce.alt} width={640} height={360} className="aspect-[16/9] w-full object-cover" />
                <CardContent>
                  <div className="flex items-start justify-between gap-3"><div><h3 className="font-semibold">{produce.name}</h3><p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground"><MapPin aria-hidden="true" className="size-4" />{produce.county}</p></div><Badge>Example</Badge></div>
                  <div className="mt-5 flex items-center justify-between border-t pt-4 text-sm"><span className="font-medium">{produce.price}</span><span className="text-muted-foreground">Example only</span></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-16 sm:pb-20 lg:pb-24">
        <Container className="grid gap-5 md:grid-cols-2">
          <div className="rounded-3xl bg-primary p-7 text-white sm:p-10">
            <Sprout aria-hidden="true" className="size-7 text-[#F2D48D]" />
            <h2 className="mt-6 text-2xl font-semibold">For farmers</h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-white/80">Make available produce easier for potential buyers to discover.</p>
            <Link className={cn(buttonVariants({ variant: "secondary" }), "mt-7 bg-white text-primary hover:bg-white/90")} href="/sign-up">Start Selling <ArrowRight aria-hidden="true" /></Link>
          </div>
          <div className="rounded-3xl border bg-secondary p-7 sm:p-10">
            <Search aria-hidden="true" className="size-7 text-primary" />
            <h2 className="mt-6 text-2xl font-semibold">For buyers</h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">Explore the marketplace experience and find out how produce discovery works.</p>
            <Link className={cn(buttonVariants(), "mt-7")} href="/marketplace">Find Produce <ArrowRight aria-hidden="true" /></Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
