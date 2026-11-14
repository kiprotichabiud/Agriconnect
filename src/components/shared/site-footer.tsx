import { Sprout } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/shared/container";

export function SiteFooter() {
  return (
    <footer className="border-t bg-white">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:py-14">
        <div>
          <Link href="/" className="inline-flex items-center gap-2 font-bold tracking-tight">
            <Sprout aria-hidden="true" className="size-5 text-primary" /> AgriConnect
          </Link>
          <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">A simpler way for farmers and buyers in Kenya to find each other.</p>
        </div>
        <div>
          <h2 className="text-sm font-semibold">Explore</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link className="hover:text-primary" href="/marketplace">Explore Produce</Link></li>
            <li><Link className="hover:text-primary" href="/how-it-works">How It Works</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold">About AgriConnect</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">We help make available produce easier to discover and connect with buyers.</p>
        </div>
        <div>
          <h2 className="text-sm font-semibold">Contact</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">Contact information will be added here.</p>
        </div>
        <div className="border-t pt-5 text-xs text-muted-foreground sm:col-span-2 lg:col-span-3">
          © AgriConnect. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
