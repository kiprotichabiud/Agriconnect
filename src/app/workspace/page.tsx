import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { isClerkConfigured, isDatabaseConfigured } from "@/lib/env";
import { getPrismaClient } from "@/lib/db";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

async function WorkspaceContent() {
  if (!isClerkConfigured()) {
    redirect("/sign-in");
  }

  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const database = getPrismaClient();

  if (!isDatabaseConfigured() || !database) {
    return (
      <section className="rounded-2xl border bg-card p-6 text-card-foreground shadow-sm sm:p-8">
        <h1 className="text-xl font-semibold">Your workspace is unavailable</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Account storage is not configured. Please try again later.
        </p>
      </section>
    );
  }

  let profile;

  try {
    profile = await database.user.findUnique({
      where: { clerkUserId: userId },
      select: { role: true },
    });
  } catch {
    console.error("Failed to load the signed-in user's profile.");
    return (
      <section className="rounded-2xl border bg-card p-6 text-card-foreground shadow-sm sm:p-8">
        <h1 className="text-xl font-semibold">Your workspace is unavailable</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          We could not load your account. Please try again later.
        </p>
      </section>
    );
  }

  if (!profile) {
    redirect("/onboarding");
  }

  const roleLabel = profile.role === "FARMER" ? "Farmer" : "Buyer";

  return (
    <section className="w-full rounded-2xl border bg-card p-6 text-card-foreground shadow-sm sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-primary">AgriConnect</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">
            Welcome to your {roleLabel.toLowerCase()} account
          </h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Your {roleLabel.toLowerCase()} account is ready. Your account type
            is saved and will be here the next time you sign in.
          </p>
          {profile.role === "FARMER" ? (
            <Link className={buttonVariants({ size: "lg" })} href="/workspace/listings">
              Manage produce listings
            </Link>
          ) : null}
        </div>
        <UserButton />
      </div>
    </section>
  );
}

async function WorkspaceNotice({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  if (params.error !== "farmer-only") return null;

  return (
    <div className="mb-4 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive" role="alert">
      Produce listing tools are available to farmer accounts.
    </div>
  );
}

export default async function WorkspacePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-4 py-12">
      <Suspense fallback={null}>
        <WorkspaceNotice searchParams={searchParams} />
      </Suspense>
      <Suspense fallback={<p role="status">Loading your account…</p>}>
        <WorkspaceContent />
      </Suspense>
    </main>
  );
}

