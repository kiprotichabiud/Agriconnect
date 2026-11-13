# Product Specification

## 1. Product summary
AgriConnect is a Kenya-first platform that helps farmers with available produce discover potential buyers and helps buyers find produce that fits their purchasing needs.

## 2. Problem
Farmers may have produce ready for sale but lack timely access to reliable demand information. Buyers may need produce but struggle to discover available supply, compare offers and contact the right sellers. Delays, poor visibility and mismatched quantities/prices can contribute to avoidable post-harvest losses.

The MVP tests whether structured listings, buyer requests and transparent matching can reduce discovery friction. It does not guarantee that food loss will be eliminated.

## 3. Users
### Farmer
A person or farming business that lists produce available for sale.
Needs to create, edit, pause and close listings; review buyer requests; accept or reject requests; and track order/request status.

### Buyer
A person or business seeking produce, such as a retailer, wholesaler, restaurant or other produce buyer.
Needs to browse/search listings, filter by product/location/quantity/price/availability, submit a purchase request and track its status.

### Administrator
Not a core user workflow for the first MVP. Add administrative capabilities only when a concrete moderation or support requirement is approved.

## 4. MVP user journeys
### Farmer journey
1. Register/sign in.
2. Complete a basic farmer profile and location.
3. Create a produce listing.
4. View and manage own listings.
5. Receive buyer purchase requests for a listing.
6. Accept or reject a request.
7. View request/order status.

### Buyer journey
1. Register/sign in.
2. Complete a basic buyer profile and location.
3. Browse available listings.
4. Search and filter by produce, location, quantity, price and availability.
5. Open a listing and review its details.
6. Submit a purchase request with requested quantity and optional message.
7. Track whether the farmer accepted or rejected the request.

## 5. Listing fields
A listing should capture only information needed to evaluate and transact:
- Produce/category.
- Description or variety when relevant.
- Quantity available and unit (initial units may include kg, crate, bag, bunch; define supported units centrally).
- Asking price per unit in KES.
- County and more precise collection area/location text.
- Availability/harvest date and optional expiry/available-until date.
- Optional produce image(s).
- Status: draft if needed, active, paused, sold out, expired or closed.

Do not assume all produce is measured in kilograms. Quantity and unit must be represented separately.

## 6. Buyer request fields
- Produce/category sought.
- Desired quantity and unit.
- Maximum price per unit in KES (optional if the buyer has no fixed budget).
- Preferred county/area (optional).
- Required-by date.
- Optional message.
- Status and timestamps.

## 7. Matching rules
Initial matching must be deterministic and explainable.
- Hard compatibility: same produce/category and compatible units.
- Availability: listing must be active and available by the buyer's required date.
- Quantity: distinguish exact fulfilment from partial fulfilment. Never imply a listing can satisfy a quantity it cannot.
- Price: compare against buyer's maximum only when supplied.
- Location: use county/area as an initial coarse filter; do not claim precise distance unless coordinates and a real distance calculation exist.
- Rank compatible results using transparent criteria. Explain why a result is recommended.
- A score is a ranking aid, not a probability of purchase or a guarantee.

Do not silently use arbitrary weights. Document and test the initial scoring formula before presenting numeric scores to users. It is acceptable to begin with filter-based matches and no percentage score.

## 8. Purchase request and order distinction
A buyer request is a request for a quantity from a listing. The farmer must accept or reject it.
Acceptance creates or transitions to a confirmed order only after server-side checks:
- Listing is still active.
- Requested quantity is still available.
- The farmer owns the listing.
- The request is still pending.
- The accepted quantity does not exceed available stock.

The application must prevent two concurrent acceptances from allocating more stock than exists. Use a transaction/atomic database update or equivalent concurrency-safe approach.

For the MVP, payment and physical delivery are outside scope. Do not label an order paid, delivered or completed without a verified workflow for those events.

## 9. Non-functional expectations
- Responsive on mobile and desktop; mobile usability is especially important.
- Clear, plain language suitable for users with varying digital literacy.
- Accessible forms and controls.
- Secure server-side authorization and input validation.
- Useful loading, empty, success and error states.
- Maintainable modular code and automated tests for critical rules.
- Use KES for money display and avoid floating-point arithmetic for stored monetary values.

## 10. Explicit exclusions
Unless approved later, do not build:
- Payment processing, M-Pesa or escrow.
- Delivery fleet, route planning or logistics booking.
- Insurance, lending or credit scoring.
- Agrovet marketplace.
- Weather forecasts or crop disease diagnosis.
- AI chatbots, LLM-based matching or predictive analytics.
- Reviews, ratings, commissions or subscriptions.
- Complex multi-warehouse inventory.

## 11. Success measures for a pilot
Track measurable funnel events, not inflated impact claims:
- Number of active farmer listings.
- Number of active buyers.
- Buyer requests submitted.
- Requests accepted/rejected.
- Accepted quantity.
- Orders explicitly marked fulfilled/collected, if a later verified confirmation step is implemented.
- Time from listing publication to first buyer request and acceptance.

Do not claim kilograms of food saved unless the product captures a credible fulfilment outcome and the calculation method is documented.
