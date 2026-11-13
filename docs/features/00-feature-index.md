# AgriConnect Feature Specification Index

## Purpose
This index is the implementation queue for the AgriConnect MVP. Each feature must be read and followed before implementation. A feature is not complete because its page exists; it must satisfy its acceptance criteria and verification requirements.

## Global implementation rules
- Follow the root `AGENTS.md` and relevant documents in `docs/`.
- Implement one feature at a time, in the sequence below, unless an approved dependency requires a change.
- Before coding, inspect the actual repository and report existing state. Do not overwrite working implementation.
- For each feature, identify prerequisites, files likely to change, data changes, security implications and tests.
- Do not implement later features opportunistically.
- Update this index with status only after verification. Allowed statuses: `NOT STARTED`, `IN PROGRESS`, `BLOCKED`, `IMPLEMENTED — NOT VERIFIED`, `VERIFIED`.
- A feature may be marked `VERIFIED` only when its acceptance criteria are met and the relevant checks have actually passed.
- If a requirement is ambiguous, ask the product owner before inventing behaviour.

## MVP feature sequence

| ID | Feature | Main outcome | Depends on | Initial status |
|---|---|---|---|---|
| F00 | Project foundation | A stable, configured application shell | Existing scaffold | VERIFIED |
| F01 | Authentication and onboarding | Users can sign in and choose a permitted role | F00 | IMPLEMENTED â€” NOT VERIFIED |
| F02 | User profiles and roles | Farmer/buyer profile data and server-enforced permissions | F01 | NOT STARTED |
| F03 | Farmer dashboard | Farmers can understand and manage their activity | F02, F04 | NOT STARTED |
| F04 | Produce listings | Farmers can create and manage available produce | F02 | NOT STARTED |
| F05 | Buyer marketplace | Buyers can discover active produce listings | F02, F04 | NOT STARTED |
| F06 | Search and filtering | Buyers can narrow listings using supported criteria | F05 | NOT STARTED |
| F07 | Buyer purchase requests | Buyers can request a quantity from a listing | F04, F05 | NOT STARTED |
| F08 | Matching engine | Buyer demand and farmer supply can be matched transparently | F04, F06, F07 | NOT STARTED |
| F09 | Request acceptance and stock allocation | Farmers can accept/reject requests without overselling | F07 | NOT STARTED |
| F10 | Basic notifications and status updates | Users can see important request status changes | F07, F09 | NOT STARTED |

## Scope note
The MVP does not include payment processing, M-Pesa, delivery/logistics booking, escrow, insurance, agrovet services, AI/LLM matching, weather prediction, chat, subscriptions or commissions. Notifications in F10 are limited to in-app status visibility unless a separate channel is explicitly approved.

## Completion gate
Before moving to the next feature:
1. Confirm acceptance criteria.
2. Run relevant tests, lint, typecheck and build scripts that exist.
3. Review authorization and data privacy.
4. Inspect the Git diff.
5. Report remaining limitations.
6. Update the status in this index.
