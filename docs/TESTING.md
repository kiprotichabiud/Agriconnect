# Testing Strategy

## Testing principles
Test behaviour and business rules, not implementation details. A page rendering is not proof that a workflow works.

## Unit tests — Vitest
Prioritize pure domain logic:
- Listing/request quantity and unit compatibility.
- Matching hard filters and ranking.
- Price limit handling.
- Availability date boundaries.
- Valid status transitions.
- Quantity allocation calculations.

Use table-driven tests for boundary cases.

## Integration tests
Test server services and database behaviour:
- Create listing with valid and invalid data.
- Enforce listing ownership.
- Create buyer request.
- Accept/reject request.
- Prevent duplicate conversion.
- Prevent overselling under concurrent operations.

Use an isolated test database or controlled test fixtures. Never run destructive test setup against production.

## End-to-end tests — Playwright
Critical user journeys:
1. Farmer signs in and creates a listing.
2. Buyer signs in and discovers the listing.
3. Buyer submits a purchase request.
4. Farmer accepts or rejects the request.
5. Both parties see the correct resulting status.
6. Unauthorized actions are blocked.

Use test accounts and test data. Do not hard-code production credentials.

## Required checks
Inspect package scripts first. Run the scripts that actually exist, such as:
- lint
- typecheck (if configured)
- unit/integration tests
- Playwright tests
- production build

Report exact commands and results. If a check cannot run because required services or credentials are missing, state that limitation rather than claiming success.

## Acceptance criteria
Each feature should have explicit acceptance criteria before implementation. Include success, invalid input, unauthorized access, empty state and relevant conflict cases.
