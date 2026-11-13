# Coding Standards

## General
- TypeScript strict mode; avoid `any`.
- Follow the existing formatter/linter configuration.
- Prefer readable, boring code over clever abstractions.
- Use named constants for domain rules and matching criteria.
- Keep functions focused and side effects explicit.
- Do not create generic frameworks or abstractions for one use case.

## Naming
- Components and types: PascalCase.
- Functions and variables: camelCase.
- Constants: UPPER_SNAKE_CASE only for true module-level constants.
- Database models: singular PascalCase; fields: camelCase, following Prisma conventions.
- Route paths: plural resource nouns where appropriate.

## React / Next.js
- Default to Server Components.
- Add `"use client"` only where browser interactivity is required.
- Keep interactive components small.
- Do not put database access, secrets or privileged business rules in client code.
- Avoid fetching the same data repeatedly in nested components; choose a clear data-loading boundary.
- Use semantic HTML, labels, keyboard support and visible focus states.

## Forms and validation
- Share schemas/types carefully, but always validate untrusted input on the server.
- Client validation improves usability; it does not replace server validation.
- Normalize user input where appropriate without silently changing meaning.
- Return field-level validation errors where useful.

## API and domain logic
- Keep handlers thin.
- Centralize business rules in feature services/domain functions.
- Check authentication, role and ownership on every protected operation.
- Use explicit result/error types or consistent response conventions.
- Avoid leaking internal exceptions to users.

## Styling and UI
- Use Tailwind and shadcn/ui consistently.
- Reuse components where there is meaningful reuse.
- Do not invent a complex design system before the MVP needs one.
- Prioritize mobile layouts, readable forms, clear status labels and accessible contrast.

## Dependencies
- Inspect whether a suitable dependency already exists before adding another.
- Explain why a new dependency is needed.
- Avoid duplicate libraries serving the same purpose.
- Do not upgrade major versions without approval and a compatibility plan.
