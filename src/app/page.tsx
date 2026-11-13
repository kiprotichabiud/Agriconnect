import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-4 py-16 sm:px-6 lg:px-8">
      <section className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          AgriConnect Kenya
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          A clearer way to connect produce with buyers.
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted-foreground">
          Create an account as a farmer or buyer to get started.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link className={buttonVariants({ size: "lg" })} href="/sign-up">
            Create account
          </Link>
          <Link
            className={buttonVariants({ size: "lg", variant: "outline" })}
            href="/sign-in"
          >
            Sign in
          </Link>
        </div>
      </section>
    </main>
  );
}
