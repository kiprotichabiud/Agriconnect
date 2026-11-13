# AgriConnect — Codex Engineering Instructions

## 1. Mission
Build AgriConnect, a Kenya-first web application that helps farmers find buyers for available agricultural produce. The MVP focuses on reducing avoidable post-harvest loss by shortening the time between produce availability and a confirmed sale.

These instructions apply to the whole repository. Read the relevant files in `docs/` before implementing a feature.

## 2. Required working behaviour
1. Inspect the existing repository before changing anything. Read `package.json`, the app structure, configuration, existing tests and relevant documentation.
2. Do not assume a dependency, script, file, database, environment variable or feature exists. Verify it.
3. Before a non-trivial task, state briefly: the goal, files likely to change, implementation approach, risks and verification plan.
4. Implement the smallest complete vertical slice. Do not scaffold unrelated features.
5. Preserve existing working code and conventions unless a change is necessary. Explain necessary deviations.
6. Never silently replace a library, framework, database, authentication provider or architectural pattern.
7. Never perform destructive operations, reset a database, delete user data, rotate credentials, force-push, or rewrite Git history without explicit approval.
8. Do not claim a command, test, migration, build or deployment succeeded unless you actually ran it and observed success. Report anything not run.
9. After implementation, summarize changed files, behaviour, commands run, test results, limitations and any required manual setup.
10. If requirements conflict or an important decision is missing, stop and ask one focused question rather than inventing a product rule.

## 3. Product boundaries
- The MVP connects farmers who have produce available with buyers seeking produce.
- Primary roles: `FARMER` and `BUYER`. An administrative role may be added only when a specific MVP requirement needs it.
- Core workflow: account/profile → farmer creates listing → buyer searches/browses → buyer submits purchase request → farmer accepts or rejects → parties can see the resulting status.
- Initial matching is deterministic and explainable. Do not introduce machine learning or an external AI service into the matching engine.
- Initial market: Kenya. Display currency as KES and support Kenyan counties/locations as ordinary data, not hard-coded assumptions about only one county.
- MVP excludes payments, escrow, delivery/logistics management, insurance, agrovet services, weather prediction, chat, subscriptions and multi-vendor commissions unless the product owner explicitly changes scope.
- A match recommendation is not a confirmed sale. A purchase request is not an accepted order. A confirmed order is not proof that produce was physically collected or payment completed.
- Do not claim food loss was prevented merely because a match was generated. Track outcomes only when the workflow captures credible confirmation.

## 4. Approved technical direction
Use this stack unless the product owner explicitly approves a change:
- Next.js App Router, React and TypeScript.
- Tailwind CSS and shadcn/ui for interface components.
- Next.js Route Handlers / server-side application logic on Node.js.
- PostgreSQL for persistent relational data.
- Prisma ORM for schema, migrations and database access.
- Clerk for authentication.
- Zod for server-side input validation.
- Vitest for unit/integration tests where appropriate; Playwright for end-to-end tests.
- Vercel as the intended application deployment platform.

Important:
- Inspect installed package versions before using APIs. Do not assume a tutorial's Prisma, Next.js or Tailwind version matches this repository.
- Follow the installed Prisma version's official configuration and migration workflow. Do not mix Prisma major-version instructions.
- Use the package manager already established by the lockfile. Do not create a second lockfile.
- Prefer stable, compatible dependencies. Do not install packages just because they are fashionable.
- Keep a modular monolith. Do not introduce microservices, queues or distributed infrastructure for this MVP.

## 5. Architecture and code boundaries
- Keep route handlers thin: parse request, authenticate/authorize, validate input, call application/domain logic, and translate the result into an HTTP response.
- Put reusable business rules in server-only service/domain modules, not in React components or route handlers.
- Keep database access on the server. Never expose Prisma or database credentials to client components.
- Client Components are for browser interaction and state that genuinely needs the browser. Prefer Server Components for read-oriented pages and server-rendered data.
- Do not add `"use client"` to a whole page/layout when a small interactive child component is sufficient.
- Keep external-provider code (Clerk, image storage, etc.) behind clear integration boundaries where practical.
- Avoid premature abstraction. Extract a shared component or helper when it has a real reuse or clarity benefit.

## 6. Implementation workflow
For each feature:
1. Read the relevant product, architecture, database, security and testing docs.
2. Identify acceptance criteria and edge cases.
3. Inspect existing implementation and dependencies.
4. Propose a small implementation plan.
5. Implement one vertical slice across UI, API/domain logic and persistence where required.
6. Validate inputs on the server with Zod.
7. Enforce authentication and authorization on the server; hiding a button is not access control.
8. Add or update tests for important business rules and failure cases.
9. Run relevant lint, typecheck, tests and build scripts that actually exist.
10. Review the diff for accidental changes, secrets, unsafe data exposure and scope creep.

## 7. TypeScript and code quality
- Use strict TypeScript. Avoid `any`; if unavoidable, isolate it and explain why.
- Prefer explicit domain types and clear names.
- Avoid duplicated business rules and magic numbers. Give matching weights and thresholds named constants with documented rationale.
- Handle loading, empty, success and error states in user-facing flows.
- Use accessible labels, keyboard-operable controls and semantic HTML.
- Do not suppress TypeScript, ESLint or test failures merely to make a command pass.
- Do not add TODO placeholders as a substitute for required implementation.

## 8. Data and security rules
- Treat all client input as untrusted.
- Never trust a user ID, role, price, listing owner or order status supplied by the browser. Derive identity from the verified Clerk session and verify ownership on the server.
- Enforce role and resource-level authorization in server-side code.
- Never expose secrets, Clerk private keys, database URLs or server environment variables to client bundles or logs.
- Use environment variables; keep `.env*` secrets out of Git. Maintain `.env.example` with names and safe placeholders only.
- Avoid collecting sensitive personal information that the MVP does not need.
- Do not publicly expose private contact details or sensitive information contained in identity documents.
- Use database transactions and appropriate constraints for stock/order operations where concurrent requests could oversell produce.
- Use safe error messages for users; do not return stack traces or database internals.

## 9. Git and change discipline
- Do not commit unless asked.
- Do not amend or rewrite existing commits unless asked.
- Keep changes focused and reviewable.
- Never edit generated files or `node_modules` manually.
- Update relevant docs when an approved architectural or product decision changes.

## 10. Definition of done
A feature is not done merely because its UI renders. It is done when:
- Acceptance criteria are met.
- Server-side validation and authorization are present where applicable.
- Success, empty and failure states are handled.
- Important logic has tests.
- Relevant lint/typecheck/tests pass, or failures are clearly reported.
- No secrets or unintended data exposure are introduced.
- Documentation is updated when behaviour or architecture changes.
