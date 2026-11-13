export function AuthConfigurationMessage() {
  return (
    <section
      aria-labelledby="auth-setup-title"
      className="w-full rounded-2xl border bg-card p-6 text-card-foreground shadow-sm sm:p-8"
    >
      <h1 id="auth-setup-title" className="text-xl font-semibold">
        Sign in is not configured yet
      </h1>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        Add the Clerk development keys to the local environment, then restart
        the app. No account information has been changed.
      </p>
    </section>
  );
}
