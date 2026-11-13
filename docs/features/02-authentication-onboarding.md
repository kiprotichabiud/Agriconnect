# F01 — Authentication and Onboarding

## 1. Purpose
Allow people to create an account and sign in through Clerk, then enter the correct AgriConnect experience based on their selected account role.

## 2. Actors and permissions
- Visitor: can access public pages and authentication screens.
- Authenticated user: can access account-protected areas.
- FARMER and BUYER: role selection is captured during onboarding, but permissions are enforced server-side.
- Do not expose an unrestricted ADMIN role in public registration.

## 3. Preconditions
- F00 verified.
- Clerk application created and environment variables configured locally.
- Current Clerk SDK documentation and installed package version checked.

## 4. User stories
- As a visitor, I want to create an account so that I can use AgriConnect.
- As a returning user, I want to sign in and resume my account.
- As a new user, I want to identify whether I am joining as a farmer or buyer so that the application can provide relevant workflows.

## 5. Functional requirements
- F01-FR-01: Provide sign-up and sign-in routes/components using Clerk's supported Next.js integration.
- F01-FR-02: Require authentication for protected application areas.
- F01-FR-03: On first application entry, collect a role choice of FARMER or BUYER.
- F01-FR-04: Persist role in the internal application profile, not solely in client state.
- F01-FR-05: Returning users retain their existing role; do not silently change it during sign-in.
- F01-FR-06: Provide sign-out.
- F01-FR-07: Handle loading, cancelled/failed auth and missing configuration states safely.

## 6. User flow
Visitor → sign up/sign in → authenticated session → role onboarding if no role exists → role-specific application entry.

If an existing user has no internal profile, create or complete it through a safe idempotent server-side flow. Avoid duplicate profile creation on refresh or repeated callbacks.

## 7. Data requirements
Use an internal User profile linked to a unique Clerk user identifier. Follow `DATABASE.md`. Do not duplicate credentials or passwords in PostgreSQL.

## 8. Validation and business rules
- Role must be one of the allowed values.
- Role selection must be validated server-side.
- Do not accept arbitrary role values from a request.
- Define whether role changes are allowed later; default assumption is that role changes are not self-service in the MVP. Ask the owner before implementing role switching.

## 9. UI requirements
- Clear sign-up and sign-in entry points.
- Explain the farmer/buyer role choice in plain language.
- Responsive, keyboard accessible forms.
- Do not ask for unnecessary personal data during initial authentication.

## 10. Security and privacy
- Verify Clerk sessions on the server.
- Never trust a client-supplied user ID or role.
- Protect internal profile creation/update operations.
- Keep Clerk secret keys server-side.
- Do not expose private profile details on public pages.

## 11. Acceptance criteria
- Given a visitor, when they complete valid sign-up, then Clerk creates an authenticated account.
- Given an unauthenticated visitor, when they access a protected route, then they are redirected or shown the supported sign-in flow.
- Given an authenticated new user, when they choose FARMER or BUYER, then the role is persisted to the internal profile.
- Given a returning user, when they sign in, then their persisted role is loaded rather than reset.
- Given a user who tampers with a request to assign an unsupported role, then the server rejects it.
- Given an authenticated user, when they sign out, then protected routes are no longer accessible.

## 12. Out of scope
Phone OTP unless explicitly selected, social providers beyond those configured, admin self-registration, multi-factor policy customization and account recovery features already handled by Clerk's hosted flow.

## 13. Testing
Test signed-out access, successful sign-in/sign-up, onboarding completion, repeated onboarding requests, unsupported role tampering and sign-out. Use test credentials, never production secrets.

## 14. Definition of done
Authentication works end-to-end locally, internal profile role is persisted safely, protected server operations verify sessions, and role tampering tests pass.
