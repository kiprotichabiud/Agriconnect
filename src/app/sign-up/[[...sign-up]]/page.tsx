import { SignUp } from "@clerk/nextjs";
import { Suspense } from "react";
import { AuthConfigurationMessage } from "@/components/auth-configuration-message";
import { isClerkConfigured } from "@/lib/env";

function SignUpContent() {
  if (!isClerkConfigured()) {
    return <AuthConfigurationMessage />;
  }

  return (
    <section className="w-full space-y-6">
      <div className="space-y-2 text-center">
        <p className="text-sm font-medium text-primary">Join AgriConnect</p>
        <h1 className="text-3xl font-semibold tracking-tight">
          Create your account
        </h1>
        <p className="text-sm leading-6 text-muted-foreground">
          Get started with your email. You’ll choose a farmer or buyer account
          after signing up.
        </p>
      </div>
      <SignUp fallbackRedirectUrl="/onboarding" signInUrl="/sign-in" />
    </section>
  );
}

export default function SignUpPage() {
  return (
    <main className="mx-auto flex w-full max-w-lg flex-1 items-center justify-center px-4 py-12">
      <Suspense fallback={<p role="status">Loading sign up…</p>}>
        <SignUpContent />
      </Suspense>
    </main>
  );
}
