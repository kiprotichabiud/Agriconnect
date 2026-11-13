# Database Design

## 1. Principles
- PostgreSQL is the source of truth for application records.
- Prisma is the ORM and migration tool.
- Model real relationships and constraints; do not use one large JSON blob for core relational data.
- Use database constraints and transactions for invariants that must hold under concurrent requests.
- Store money as integer minor units (for KES, integer cents where fractional prices are supported) or a carefully chosen Decimal type. Never use JavaScript floating-point values as the authoritative stored money representation.
- Store timestamps consistently (UTC in the database); display in the user's relevant timezone.
- Use enums or constrained values for statuses and units where appropriate.

## 2. Initial conceptual entities
These are conceptual requirements, not permission to generate a final schema without checking implementation details.

### User
- Internal ID.
- Unique Clerk user ID.
- Role: FARMER or BUYER (ADMIN only if approved).
- Display name and minimal profile/contact fields required by the product.
- Created/updated timestamps.

### ProduceListing
- ID and farmer/user foreign key.
- Produce category/name and optional variety/description.
- Available quantity and unit.
- Price per unit and currency (KES for initial market).
- County and collection area.
- Availability and optional expiry dates.
- Status.
- Created/updated timestamps.

### BuyerRequest
- ID and buyer/user foreign key.
- Desired produce/category.
- Requested quantity and unit.
- Optional maximum price per unit.
- Optional preferred location.
- Required-by date.
- Optional message.
- Status and timestamps.

### Match
Only persist matches if there is a clear product need for history, notifications or workflow. Otherwise calculate compatible listings on demand.
If persisted, link a buyer request and listing, record the matching rationale/version and status, and avoid treating a match as a sale.

### PurchaseOrder
- ID, buyer, farmer, listing and originating buyer request references.
- Agreed quantity, unit and agreed unit price.
- Status and timestamps.
- Preserve an agreed price snapshot; do not rely on a listing's later edited price to rewrite an existing agreement.

## 3. Relationships
- One User with FARMER role can own many ProduceListings.
- One User with BUYER role can create many BuyerRequests.
- A BuyerRequest can be compatible with many listings.
- A listing can receive many buyer requests, subject to availability.
- An accepted request may create one PurchaseOrder, with uniqueness constraints preventing duplicate conversion.
- A PurchaseOrder references the buyer, farmer and listing involved.

## 4. Critical quantity invariant
Never allow accepted order quantities to exceed available listing quantity.

Before acceptance, verify the listing and request are still eligible. Perform the stock allocation and request/order state transition in a database transaction with concurrency-safe updates/constraints. A read-then-write sequence without concurrency protection is insufficient.

Define whether accepting a request reserves stock, reduces available quantity immediately, or uses a separate reserved quantity. Document the selected model and test simultaneous acceptance attempts.

## 5. Status design
Keep statuses explicit and transitions controlled by server-side domain logic. Example concepts:
- Listing: ACTIVE, PAUSED, SOLD_OUT, EXPIRED, CLOSED.
- Buyer request: PENDING, ACCEPTED, REJECTED, WITHDRAWN.
- Purchase order: CONFIRMED, CANCELLED, FULFILMENT_REPORTED (only if that workflow is implemented).

Do not allow clients to set arbitrary status strings. Do not add statuses without defining valid transitions and actors.

## 6. Schema and migration workflow
- Inspect the installed Prisma version and its official migration/configuration instructions before setup.
- Make schema changes through migrations, not manual production database edits.
- Review generated SQL for destructive or surprising changes.
- Never run a destructive reset against a database containing data without explicit approval.
- Seed only clearly identified development/test data. Never seed fake production transactions.
- Add indexes for actual query patterns after considering filters and relationships; avoid speculative indexing.

## 7. Questions to resolve before final schema
- Which produce units are supported in the first release?
- Can one buyer request be fulfilled by multiple farmers, or must one listing satisfy it?
- Can one listing be partially allocated to multiple accepted requests?
- Does a farmer confirm stock before each acceptance?
- What minimal contact details are shown after acceptance?
- Are matches calculated from listings, buyer requests, or both?

Do not silently decide these product rules. Raise them when implementation reaches the relevant feature.
