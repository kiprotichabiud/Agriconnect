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
