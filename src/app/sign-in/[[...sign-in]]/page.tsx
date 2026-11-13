import { SignIn } from "@clerk/nextjs";
import { Suspense } from "react";
import { AuthConfigurationMessage } from "@/components/auth-configuration-message";
import { isClerkConfigured } from "@/lib/env";

function SignInContent() {
  if (!isClerkConfigured()) {
    return <AuthConfigurationMessage />;
  }

  return (
    <section className="w-full space-y-6">
      <div className="space-y-2 text-center">
        <p className="text-sm font-medium text-primary">Welcome back</p>
        <h1 className="text-3xl font-semibold tracking-tight">
          Sign in to AgriConnect
        </h1>
        <p className="text-sm leading-6 text-muted-foreground">
          Continue securely with your email to manage your produce and
          connections.
        </p>
      </div>
      <SignIn fallbackRedirectUrl="/onboarding" signUpUrl="/sign-up" />
    </section>
  );
}

export default function SignInPage() {
  return (
    <main className="mx-auto flex w-full max-w-lg flex-1 items-center justify-center px-4 py-12">
      <Suspense fallback={<p role="status">Loading sign in…</p>}>
        <SignInContent />
      </Suspense>
    </main>
  );
}
