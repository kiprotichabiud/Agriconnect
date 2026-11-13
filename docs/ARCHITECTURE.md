# Architecture

## 1. Architecture style
Use a modular monolith: one Next.js application with clear feature/domain boundaries. Do not split into microservices for the MVP.

## 2. High-level request flow
1. Browser renders a page using a Next.js Server Component where possible.
2. User interaction submits to a Server Action or Route Handler, chosen consistently for the use case.
3. Server verifies the Clerk session.
4. Server checks role and resource ownership.
5. Zod validates request data.
6. Application/domain service applies business rules.
7. Prisma reads/writes PostgreSQL.
8. Server returns a typed result or safe HTTP response.
9. UI renders updated state and feedback.

Do not access PostgreSQL directly from the browser.

## 3. Suggested feature-oriented structure
Adapt this to the actual scaffold; do not move files solely to match a diagram.

```text
src/
  app/
    (public)/
    (auth)/
    (farmer)/
    (buyer)/
    api/
  components/
    ui/
    shared/
  features/
    listings/
      components/
      schemas/
      services/
      types/
    buyer-requests/
      components/
      schemas/
      services/
      types/
    matching/
      services/
      types/
  lib/
    auth/
    db/
    env/
    http/
  server/
    services/
  types/
prisma/
  schema.prisma
docs/
```

Keep domain logic server-only. Avoid importing server modules into Client Components.

## 4. Route handler conventions
- Use resource-oriented paths, for example `/api/listings`, `/api/listings/[listingId]`, `/api/buyer-requests`.
- Use appropriate HTTP methods: GET read, POST create, PATCH partial update/state transition, DELETE only when deletion is genuinely required.
- Validate route parameters and request bodies.
- Return appropriate status codes: 200/201 success, 400 invalid input, 401 unauthenticated, 403 forbidden, 404 missing resource, 409 state/conflict, 500 unexpected server failure.
- Never expose raw exception messages, stack traces or database internals.
- Keep handlers thin; delegate business rules to feature services.

Use Server Actions where they simplify form mutations within the Next.js application, but do not mix patterns arbitrarily. Document the chosen pattern for each feature.

For F01 authentication and onboarding, Clerk renders the sign-in and sign-up flows. The role-selection form submits to a Server Action, which verifies the Clerk session, validates the role, and upserts the minimal internal User profile by Clerk user ID. The upsert is idempotent; an existing role is not changed by another selection. `/workspace` is the minimal post-onboarding entry point; role-specific dashboards remain part of later features.

## 5. Server and client components
- Default to Server Components.
- Use Client Components only for interactive browser behaviour such as controlled filters, menus, dialogs or client-side form interactions.
- Keep client boundaries small.
- Do not fetch sensitive or authorization-dependent data from an unprotected client-side endpoint.

## 6. External integrations
- Clerk: identity/session provider. Maintain an internal User profile linked by a unique Clerk user ID.
- PostgreSQL/Prisma: persistent application data.
- Image storage: defer until image upload is required; if enabled, validate type/size and use a provider designed for uploads. Do not store large image binaries in PostgreSQL.
- Vercel: intended hosting. Production environment variables and database connectivity must be configured separately from local development.

## 7. Environment configuration
Create `.env.example` containing variable names and safe placeholders only. Validate required server environment variables centrally. Never prefix secrets with `NEXT_PUBLIC_`.

Potential variables, subject to actual integrations:
- `DATABASE_URL`
- `DIRECT_URL` only if required by the selected PostgreSQL hosting/provider and Prisma setup
- Clerk publishable key and secret key using the names required by the installed Clerk SDK
- Image provider credentials only after image storage is implemented

Do not invent environment variable names when the installed provider's current documentation specifies them.

## 8. Observability and errors
- Log unexpected server errors with a request/correlation identifier where practical.
- Never log passwords, tokens, private keys, full identity documents or unnecessary personal data.
- Present users with actionable but non-sensitive messages.
- Distinguish expected domain conflicts from unexpected infrastructure failures.
