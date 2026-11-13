# F00 — Project Foundation

## 1. Purpose
Establish a reliable, understandable Next.js application foundation for AgriConnect before product features are added.

## 2. Actors and permissions
Developer-only. No end-user functionality is introduced.

## 3. Preconditions
- Repository exists or the owner has approved creating it.
- Root `AGENTS.md` and project documentation are present.
- Existing package manager and scaffold have been inspected.

## 4. User stories
Not applicable; this is an engineering foundation feature.

## 5. Functional requirements
- F00-FR-01: The application starts locally using the existing package manager.
- F00-FR-02: The app has a clear public route and shared root layout.
- F00-FR-03: TypeScript, linting and styling configuration work with installed versions.
- F00-FR-04: Environment variables are validated server-side where needed.
- F00-FR-05: `.env.example` documents required variable names with safe placeholders only.
- F00-FR-06: A feature-oriented source structure is established without premature abstractions.
- F00-FR-07: A useful README explains prerequisites, setup, development, tests and environment configuration.

## 6. Implementation notes
Inspect `package.json`, lockfile and existing scaffold first. Do not recreate the app or replace configuration just to match a preferred template. Verify installed Next.js, React, TypeScript and Tailwind versions. Set up shadcn/ui only if it is not already configured.

Suggested structure is in `ARCHITECTURE.md`; adapt it to the actual scaffold and explain deviations.

## 7. UI requirements
Create only a minimal application shell and a placeholder public landing route. Do not build the complete marketing site or dashboards in this feature.

## 8. Security
No secrets in source control or client bundles. Never create fake production credentials.

## 9. Acceptance criteria
- Given a clean dependency installation, when the documented install command is run, then dependencies install without lockfile conflicts.
- Given the configured repository, when the documented development command is run, then the app loads locally.
- When lint, typecheck (if configured) and production build are run, then they pass or existing failures are explicitly documented.
- When `.env.example` is inspected, then it contains no real credentials.
- When the source structure is inspected, then server-only utilities are not imported into client components.

## 10. Out of scope
Authentication, database schema, real marketplace pages, matching logic and deployment.

## 11. Testing
Verify install, dev server, lint, typecheck and production build. Add a basic smoke test only if the project's test setup is already being established.

## 12. Definition of done
The app runs locally, its setup is documented, configuration is coherent with actual dependency versions, and no product functionality has been falsely represented as working.
