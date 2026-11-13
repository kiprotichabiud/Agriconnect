# Security and Privacy Requirements

## Security baseline
- Treat browser input, query parameters, uploaded files and external provider responses as untrusted.
- Verify Clerk identity on the server for protected operations.
- Enforce role authorization and record ownership on the server. UI visibility is not authorization.
- Use Zod or equivalent schemas to validate all write inputs.
- Use Prisma parameterized query APIs; do not construct raw SQL from untrusted strings.
- Keep secrets server-side and out of Git, client bundles, screenshots and logs.
- Return safe error messages; do not reveal stack traces, SQL, internal IDs unnecessarily or environment configuration.

## Access control examples
- A FARMER can create and manage only their own listings.
- A BUYER cannot edit another user's listing.
- A BUYER can create and view their own requests.
- A FARMER can view/respond only to requests for listings they own.
- Only permitted actors can transition request/order status.
- Every operation must re-check the current resource state; do not rely on stale UI state.

## Personal data
- Collect only information required for account, discovery and transaction coordination.
- Do not collect national ID images or sensitive identity documents for the MVP.
- Do not expose personal phone/email details on public listing pages by default.
- Decide what contact information is shared and at which workflow stage before implementing it.
- Avoid logging contact details and other personal information unless operationally necessary.

## Listing images
When image uploads are implemented:
- Allow only required image formats.
- Enforce file-size and count limits on the server/provider.
- Do not trust the file extension or browser-provided MIME type alone.
- Use controlled storage permissions and safe public/private URL behaviour.
- Do not accept arbitrary remote URLs as trusted uploads.

## Abuse and reliability
- Consider rate limiting for account-sensitive and write endpoints before public launch.
- Prevent duplicate submissions where practical.
- Protect stock allocation and order acceptance against race conditions.
- Avoid revealing whether private user accounts exist through overly detailed authentication errors.

## Security verification
Test at least:
- Unauthenticated write attempt.
- Buyer attempting farmer-only action.
- User attempting to modify another user's listing/request.
- Invalid and oversized input.
- Tampered price, owner ID, role or status from the client.
- Concurrent acceptance attempts against limited stock.
