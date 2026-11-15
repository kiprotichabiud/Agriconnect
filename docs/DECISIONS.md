# Architecture Decision Log

Record decisions that materially affect product behaviour, architecture, security or data design.

Use this format:

## ADR-XXX — Short decision title
- **Status:** Proposed / Accepted / Superseded
- **Date:** YYYY-MM-DD
- **Context:** What problem or constraint requires a decision?
- **Decision:** What are we choosing?
- **Alternatives considered:** What else was considered?
- **Consequences:** Benefits, costs and trade-offs.
- **Approval:** Who approved the decision?

## Initial decisions

### ADR-001 — Modular monolith for MVP
- **Status:** Accepted
- **Context:** The MVP needs a manageable architecture that one small team can build and operate.
- **Decision:** Use one Next.js application with feature-oriented modules and server-side business logic.
- **Alternatives considered:** Separate frontend/backend services and microservices.
- **Consequences:** Simpler local development and deployment; modules must remain well separated as the codebase grows.

### ADR-002 — Deterministic matching before AI
- **Status:** Accepted
- **Context:** The MVP needs explainable matching based on produce, quantity, price, location and availability.
- **Decision:** Start with explicit rules and tests. Do not use an LLM or predictive model for core matching.
- **Alternatives considered:** LLM recommendations and machine-learning ranking.
- **Consequences:** Easier to test, debug and explain; more advanced ranking can be evaluated later using real usage data.

### ADR-003 — No payment or logistics in first MVP
- **Status:** Accepted
- **Context:** Payment and logistics would significantly increase delivery, compliance and operational complexity.
- **Decision:** The MVP supports discovery, purchase requests and farmer response only.
- **Alternatives considered:** Integrating payment and delivery workflows immediately.
- **Consequences:** Faster validation of the core matching problem; the product must not imply payment or delivery has occurred.

### ADR-004 — Initial produce listing representation
- **Status:** Accepted
- **Date:** 2026-11-14
- **Context:** F04 needs consistent quantity, price, availability, location and listing lifecycle fields before persistence and farmer forms can be implemented.
- **Decision:** Support `kg`, `crate`, `bag` and `bunch`; store quantities as PostgreSQL `Decimal(12,3)` and KES unit prices as `Decimal(12,2)`; store availability as UTC `DATE` values; require county and collection area; start listings as active. Farmers may pause, resume, mark sold out or close listings. Expiration is derived from the available-until date when reading listings. Image upload is deferred because no storage provider is configured and images are optional. F04 authorization uses F01's persisted role; F02 profile fields remain out of scope.
- **Alternatives considered:** Free-form units, floating-point price/quantity, a provider-specific image URL field and an expiration scheduler.
- **Consequences:** Forms and records use a small consistent unit set and exact decimal storage. Fractional quantities are allowed. Listing reads can show expiration without a background worker. The future marketplace must exclude listings whose availability date has passed. Image storage requires a separately approved provider decision. F04 is implemented before F02 using the persisted role already available from onboarding.
- **Approval:** Product owner approved the implementation plan and these initial defaults on 2026-11-14.
