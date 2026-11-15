We are now proceeding with F05 — Produce Listings.

Read the following before implementation:

- AGENTS.md
- docs/features/00-feature-index.md
- docs/features/05-produce-listings.md
- docs/DATABASE.md
- docs/ARCHITECTURE.md
- docs/SECURITY.md
- docs/CODING_STANDARDS.md

First inspect the existing repository.

Before coding, verify:
1. Authentication from F01 is working.
2. User profiles and farmer/buyer roles from F02 are implemented.
3. The existing database schema supports the requirements in F04.
4. The design system and shared components are available.
5. There are no unresolved conflicts concerning listing fields, measurement units, prices or stock representation.

Then present an implementation plan covering:

- Database models and relationships.
- API endpoints or server actions.
- Farmer authorization and ownership checks.
- Listing creation and editing.
- Image upload approach.
- Validation and error handling.
- Frontend pages and reusable components.
- Tests and acceptance criteria.

Do not start coding until I approve the plan.

After approval, implement F04 only.

Do not implement the buyer marketplace, search engine, purchase requests, matching engine or stock reservation system.

Use real database operations rather than hardcoded sample data for functional listing operations.

After implementation, run the available tests, lint, type checking and production build. Report the files changed, test results, remaining issues and acceptance criteria evidence.

Do not mark F04 VERIFIED without demonstrating that its requirements work.