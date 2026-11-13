import { auth } from "@clerk/nextjs/server";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { RoleForm } from "@/app/onboarding/role-form";
import { AuthConfigurationMessage } from "@/components/auth-configuration-message";
import { isClerkConfigured, isDatabaseConfigured } from "@/lib/env";
import { getPrismaClient } from "@/lib/db";

async function OnboardingContent() {
  if (!isClerkConfigured()) {
    return <AuthConfigurationMessage />;
  }

  if (!isDatabaseConfigured()) {
    return (
      <section className="rounded-2xl border bg-card p-6 text-card-foreground shadow-sm sm:p-8">
        <h1 className="text-xl font-semibold">Account setup is unavailable</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          The application database is not configured. Please try again later.
        </p>
      </section>
    );
  }

  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const database = getPrismaClient();

  if (!database) {
    return (
      <section className="rounded-2xl border bg-card p-6 text-card-foreground shadow-sm sm:p-8">
        <h1 className="text-xl font-semibold">Account setup is unavailable</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          The application database is not configured. Please try again later.
        </p>
      </section>
    );
  }

  let profile: { id: string } | null;

  try {
    profile = await database.user.findUnique({
      where: { clerkUserId: userId },
      select: { id: true },
    });
  } catch {
    console.error("Failed to check the onboarding profile.");
    return (
      <section className="rounded-2xl border bg-card p-6 text-card-foreground shadow-sm sm:p-8">
        <h1 className="text-xl font-semibold">Account setup is unavailable</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          We could not check your account. Please try again later.
        </p>
      </section>
    );
  }

  if (profile) {
    redirect("/workspace");
  }

  return (
    <section className="w-full rounded-2xl border bg-card p-6 text-card-foreground shadow-sm sm:p-8">
      <p className="text-sm font-medium text-primary">One last step</p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">
        How will you use AgriConnect?
      </h1>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        Choose the account type that fits you. This choice is saved to your
        account and cannot be changed here later.
      </p>
      <RoleForm />
    </section>
  );
}

export default function OnboardingPage() {
  return (
    <main className="mx-auto flex w-full max-w-lg flex-1 items-center justify-center px-4 py-12">
      <Suspense fallback={<p role="status">Loading account setup…</p>}>
        <OnboardingContent />
      </Suspense>
    </main>
  );
}
