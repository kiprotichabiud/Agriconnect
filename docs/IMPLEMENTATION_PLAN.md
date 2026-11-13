# Implementation Plan

## Delivery method
Build vertical slices. Each slice should include the relevant UI, server-side behaviour, persistence, validation, authorization and tests. Do not build every screen before implementing the backend.

## Phase 0 — Repository and environment audit
- Inspect Node.js, npm, Git and PostgreSQL availability.
- Inspect the existing repository and lockfile.
- Confirm Next.js/React/TypeScript/Tailwind versions.
- Initialize or verify the Next.js App Router project.
- Initialize Git and a first baseline commit only when requested by the developer.
- Configure shadcn/ui only after confirming the app scaffold works.
**Exit criteria:** app starts locally; lint/typecheck/build scripts are understood; repository structure is documented.

## Phase 1 — Product and UI foundation
- Implement responsive public landing page.
- Establish typography, colours, navigation and reusable layout.
- Add farmer/buyer entry points.
- Create accessible loading, empty and error states.
**Exit criteria:** navigable UI shell, no fake backend functionality presented as real.

## Phase 2 — Database and domain foundation
- Configure PostgreSQL and the installed Prisma version correctly.
- Design User, ProduceListing and BuyerRequest models; defer optional models until needed.
- Add migrations and safe development seed data.
- Add server-only database client and environment validation.
**Exit criteria:** migration applies locally; basic queries work; schema relationships and constraints are reviewed.

## Phase 3 — Authentication and authorization
- Integrate Clerk using current SDK documentation.
- Link Clerk identity to internal User profile.
- Implement role-aware onboarding for FARMER and BUYER.
- Protect server routes and pages.
- Test unauthenticated, wrong-role and resource-ownership cases.
**Exit criteria:** users can sign in and only perform actions allowed by their role.

## Phase 4 — Farmer listings vertical slice
- Create listing form and server schema.
- Create listing endpoint/action and service.
- Validate quantity, unit, price, location and dates.
- Implement farmer listing management and status changes.
- Test ownership and invalid inputs.
**Exit criteria:** a farmer can create, view, edit and pause their own listing.

## Phase 5 — Buyer marketplace vertical slice
- Browse active listings.
- Search/filter by produce, county/area, price, quantity and availability.
- Add pagination or bounded result sizes.
- Show listing details without exposing private farmer data prematurely.
**Exit criteria:** buyer can find and inspect relevant active listings.

## Phase 6 — Buyer requests
- Create buyer request form and server validation.
- Check requested quantity/unit compatibility.
- Let farmers view requests for their listings.
- Implement accept/reject transitions.
- Protect against duplicate and unauthorized transitions.
**Exit criteria:** buyer request lifecycle works and is tested.

## Phase 7 — Matching
- Define hard filters and ranking rules before coding.
- Explain why each result matches.
- Handle partial quantity and incompatible units honestly.
- Add tests for ranking and boundary cases.
**Exit criteria:** results are deterministic, explainable and do not overstate fulfilment.

## Phase 8 — Order/stock integrity
- Decide and document reservation/allocation semantics.
- Implement concurrency-safe acceptance and stock allocation.
- Preserve agreed price/quantity snapshots.
- Test simultaneous requests and insufficient stock.
**Exit criteria:** accepted quantities cannot exceed available stock.

## Phase 9 — Quality and security
- Add unit, integration and end-to-end tests for critical flows.
- Test access control, validation, error handling and responsive usability.
- Review privacy, logging, secrets and dependency vulnerabilities.
- Fix defects; do not silence failing tests.
**Exit criteria:** agreed critical test suite passes and known limitations are documented.

## Phase 10 — Deployment
- Prepare production PostgreSQL.
- Configure Vercel and environment variables.
- Apply migrations using a safe production workflow.
- Configure Clerk production settings and allowed URLs.
- Deploy and smoke-test registration, listing, browsing and request flows.
- Document rollback and operational limitations.
**Exit criteria:** deployed MVP passes production smoke tests.

## Session reporting format
At the end of every implementation session, report:
1. What was completed.
2. Files changed.
3. Commands run and actual outcomes.
4. Tests run and results.
5. Decisions made (and update `docs/DECISIONS.md`).
6. Remaining blockers.
7. The next smallest useful task.
