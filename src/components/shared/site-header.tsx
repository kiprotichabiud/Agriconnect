"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import { Menu, Sprout, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/marketplace", label: "Explore Produce" },
  { href: "/how-it-works", label: "How It Works" },
];

function Brand() {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="AgriConnect home">
      <span className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground">
        <Sprout aria-hidden="true" className="size-5" />
      </span>
      <span className="text-lg font-bold tracking-tight">AgriConnect</span>
    </Link>
  );
}

function AuthControls({ mobile, onNavigate }: { mobile?: boolean; onNavigate?: () => void }) {
  const { isLoaded, isSignedIn } = useAuth();
  if (!isLoaded) return null;

  if (isSignedIn) {
    return mobile ? (
      <>
        <Link className="rounded-lg px-3 py-3 text-sm font-medium hover:bg-secondary" href="/workspace" onClick={onNavigate}>My account</Link>
        <div className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground"><UserButton /> Manage account</div>
      </>
    ) : (
      <>
        <Link className={buttonVariants({ variant: "outline", size: "default" })} href="/workspace">My account</Link>
        <UserButton />
      </>
    );
  }

  return mobile ? (
    <div className="mt-2 grid grid-cols-2 gap-3 border-t pt-4">
      <Link className={cn(buttonVariants({ variant: "outline" }), "h-11")} href="/sign-in" onClick={onNavigate}>Sign In</Link>
      <Link className={cn(buttonVariants(), "h-11")} href="/sign-up" onClick={onNavigate}>Get Started</Link>
    </div>
  ) : (
    <>
      <Link className={buttonVariants({ variant: "ghost", size: "default" })} href="/sign-in">Sign In</Link>
      <Link className={buttonVariants({ size: "default" })} href="/sign-up">Get Started</Link>
    </>
  );
}

export function SiteHeader({ clerkEnabled }: { clerkEnabled: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <div className="mx-auto flex min-h-18 w-full max-w-[var(--container-width)] items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
        <Brand />
        <nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          {clerkEnabled ? <AuthControls /> : <>
            <Link className={buttonVariants({ variant: "ghost", size: "default" })} href="/sign-in">Sign In</Link>
            <Link className={buttonVariants({ size: "default" })} href="/sign-up">Get Started</Link>
          </>}
        </div>
        <Button
          aria-controls="mobile-navigation"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          className="md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          size="icon-lg"
          type="button"
          variant="outline"
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </Button>
      </div>
      {menuOpen ? (
        <nav id="mobile-navigation" aria-label="Mobile navigation" className="border-t bg-background px-5 py-4 md:hidden">
          <div className="mx-auto flex max-w-[var(--container-width)] flex-col gap-1">
            {navLinks.map((link) => (
              <Link className="rounded-lg px-3 py-3 text-sm font-medium hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" href={link.href} key={link.href} onClick={() => setMenuOpen(false)}>
                {link.label}
              </Link>
            ))}
            {clerkEnabled ? <AuthControls mobile onNavigate={() => setMenuOpen(false)} /> : <div className="mt-2 grid grid-cols-2 gap-3 border-t pt-4">
              <Link className={cn(buttonVariants({ variant: "outline" }), "h-11")} href="/sign-in" onClick={() => setMenuOpen(false)}>Sign In</Link>
              <Link className={cn(buttonVariants(), "h-11")} href="/sign-up" onClick={() => setMenuOpen(false)}>Get Started</Link>
            </div>}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
