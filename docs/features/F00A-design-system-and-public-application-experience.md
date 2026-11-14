# F00A — Design System and Public Application Experience

**Project:** AgriConnect  
**Feature ID:** F00A  
**Priority:** High  
**Status:** NOT STARTED  
**Depends on:** F00 — Project Foundation  
**Primary objective:** Establish a consistent visual identity and build the public-facing application experience before implementing the main functional features.

---

## 1. Feature Overview

AgriConnect needs a consistent visual identity before the development of its main features.

This feature establishes the application's design system, shared UI components, navigation structure, responsive layouts and public homepage.

The interface should communicate trust, simplicity, accessibility and professionalism. It should serve Kenyan farmers and buyers who need a straightforward way to discover and trade available agricultural produce.

The application should look like a modern technology marketplace with a recognisable agricultural identity. Avoid making it look like a generic admin dashboard or an outdated agricultural website.

## 2. Design Direction

Use the following proposed design direction as the starting point.

### 2.1 Brand identity

- Product name: AgriConnect
- Product category: Agricultural produce marketplace
- Visual direction: Modern, clean and agricultural.
- Primary colour: Forest green.
- Secondary colour: Warm cream.
- Accent colour: Warm gold.
- Supporting colours: White, charcoal and muted grey.

Suggested initial colour tokens:

| Token | Colour | Purpose |
|---|---|---|
| Primary | `#245C40` | Main brand colour |
| Primary Hover | `#19452F` | Hover states |
| Secondary | `#F5F1E8` | Warm background |
| Accent | `#D6A84F` | Highlights and accents |
| Surface | `#FFFFFF` | Cards and panels |
| Text Primary | `#202820` | Main text |
| Text Secondary | `#68736A` | Supporting text |
| Border | `#E5E9E3` | Dividers and outlines |
| Success | `#287A4B` | Successful actions |
| Warning | `#B7791F` | Warnings |
| Error | `#B42318` | Errors |

These are initial design tokens. Keep them centralised so the visual identity can be changed without editing individual components.

### 2.2 Typography

Use a modern, readable font combination.

Preferred direction:
- Headings: Manrope or an equivalent modern sans-serif.
- Body: Inter or an equivalent readable sans-serif.

Avoid excessive font weights, oversized headings and unnecessary decorative typography.

### 2.3 General design principles

1. Maintain consistent spacing across the application.
2. Use clear visual hierarchy.
3. Keep layouts clean and uncluttered.
4. Use consistent border radii and shadows.
5. Use accessible colour contrast.
6. Make all layouts responsive.
7. Avoid unnecessary animations.
8. Use meaningful agricultural imagery rather than random stock illustrations.
9. Avoid excessive gradients, glassmorphism and decorative effects.
10. Do not sacrifice usability for visual appearance.

---

## 3. Functional Scope

This feature contains four main implementation areas.

### 3.1 Design System

Create a centralised design system that defines:

- Colour tokens.
- Typography scale.
- Spacing conventions.
- Border radius.
- Shadows.
- Container widths.
- Responsive breakpoints.
- Button variants.
- Input styles.
- Card styles.
- Badge and status styles.

Use the existing Tailwind CSS configuration and project conventions. Do not introduce a second styling system.

### 3.2 Shared UI Components

Create reusable components where appropriate.

Expected components include:

- Button
- Input
- Label
- Textarea
- Select
- Card
- Badge
- Alert
- Loading indicator
- Empty state
- Error state
- Section heading
- Container
- Page layout

Use shadcn/ui where it provides a suitable foundation. Extend its components to match the AgriConnect design system instead of creating unnecessary replacements.

Components should support consistent styling and accessibility.

### 3.3 Application Navigation

Create a responsive navigation system.

**Desktop navigation**

- AgriConnect logo and name.
- Home.
- Explore Produce.
- How It Works.
- Sign In.
- Get Started.

**Mobile navigation**

- Compact brand identity.
- Accessible menu trigger.
- Clear navigation links.
- Appropriate spacing and touch targets.

**Authentication-aware behaviour**

- Logged-out users see Sign In and Get Started.
- Authenticated users should eventually see role-appropriate navigation.
- Do not invent authentication functionality in this feature.
- Prepare the component structure for Clerk integration in F01.

Do not expose dashboard links to logged-out users.

### 3.4 Public Homepage

Build a complete, responsive public landing page.

The homepage should explain what AgriConnect does and guide farmers and buyers towards the appropriate actions.

**Section A — Hero**

Include:
- A clear headline explaining the farmer-to-buyer marketplace.
- A short supporting description.
- Primary CTA: Explore Produce.
- Secondary CTA: Sell Your Produce.
- Relevant agricultural imagery.
- A clean, balanced layout.

Suggested headline:

"Connecting Farmers to Buyers. Reducing Food Waste."

Supporting description:

"AgriConnect helps farmers showcase available produce and connects buyers with agricultural products they need."

**Section B — How AgriConnect Works**

Explain the process in three simple steps:

1. Farmers list available produce.
2. Buyers discover and request produce.
3. Farmers review requests and confirm availability.

Use simple icons or illustrations.

**Section C — Why AgriConnect**

Communicate the platform's main value propositions:

- Better market access for farmers.
- Easier produce discovery for buyers.
- Improved visibility of available produce.
- Reduced avoidable food loss through better connections.

Do not make unsupported claims about measured food waste reduction.

**Section D — Explore Produce Preview**

Create a visual preview of produce listings.

Each preview card may display:
- Produce image.
- Produce name.
- Location.
- Price per unit, where available.
- Availability status.

Use clearly identified sample data only.

This section is a visual preview, not a replacement for the functional marketplace feature.

**Section E — Separate Farmer and Buyer CTAs**

Create two clear sections:

For farmers:
- Explain the benefit of listing available produce.
- CTA: Start Selling.

For buyers:
- Explain how they can discover available produce.
- CTA: Find Produce.

**Section F — Footer**

Include:
- AgriConnect branding.
- Navigation links.
- About section.
- Contact placeholder only if no real contact details exist.
- Copyright notice.

Do not invent business addresses, phone numbers or social media accounts.

---

## 4. Page and Route Expectations

Establish the following public routes where appropriate:

| Route | Purpose |
|---|---|
| `/` | Public homepage |
| `/marketplace` | Marketplace entry point |
| `/how-it-works` | Explanation of the platform |
| `/sign-in` | Future authentication entry point |
| `/sign-up` | Future registration entry point |

Only implement the public homepage and necessary route shells in this feature.

Do not implement full marketplace search, registration, login or dashboard functionality. Those belong to their respective feature specifications.

If the existing architecture uses different route conventions, follow the architecture document and explain any necessary changes.

---

## 5. Technical Requirements

Follow the existing project architecture.

Expected stack:

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide icons where appropriate

Requirements:

1. Use reusable components.
2. Keep components small and maintainable.
3. Use semantic HTML.
4. Support keyboard navigation.
5. Add appropriate accessible labels.
6. Avoid unnecessary dependencies.
7. Avoid hardcoding repeated styling values.
8. Use Next.js image handling appropriately.
9. Avoid unnecessary client components.
10. Ensure the application works on desktop, tablet and mobile.

Use local assets or properly configured image sources. Do not rely on random image URLs that may break.

Do not introduce a backend, database schema or authentication implementation as part of this feature.

---

## 6. Out of Scope

The following are explicitly excluded:

- Functional authentication.
- Clerk configuration.
- Database integration.
- Real produce listings.
- Marketplace filtering.
- Buyer purchase requests.
- Matching engine.
- Farmer dashboard functionality.
- Buyer dashboard functionality.
- Payment processing.
- M-Pesa integration.
- Notifications.
- Chat functionality.

These features have their own specifications.

---

## 7. Acceptance Criteria

The feature is considered implemented only when:

- [ ] A centralised AgriConnect design system exists.
- [ ] Colour, typography and spacing tokens are consistently applied.
- [ ] Shared UI components are reusable.
- [ ] Desktop navigation works.
- [ ] Mobile navigation works.
- [ ] The homepage contains all specified sections.
- [ ] Homepage CTAs point to appropriate routes.
- [ ] The homepage is responsive across common screen sizes.
- [ ] Images have appropriate alternative text.
- [ ] Navigation and controls are keyboard accessible.
- [ ] Empty, loading and error states have reusable patterns.
- [ ] No placeholder content falsely represents real marketplace data.
- [ ] No unrelated functional features have been introduced.
- [ ] Linting, type checking and production build pass.

## 8. Implementation Process

Before writing code:

1. Read `AGENTS.md`.
2. Read `docs/ARCHITECTURE.md`.
3. Read `docs/CODING_STANDARDS.md`.
4. Inspect the existing project structure.
5. Inspect installed dependencies and existing UI components.
6. Check the F00A specification against the existing project.
7. Present a short implementation plan.

Then implement in this order:

1. Design tokens and global styles.
2. Typography and reusable UI primitives.
3. Shared application layout.
4. Desktop and mobile navigation.
5. Homepage sections.
6. Footer.
7. Responsive and accessibility improvements.
8. Testing and build verification.

Do not replace existing working code without a clear reason.

## 9. Completion Report

After implementation, provide:

1. Summary of what was implemented.
2. Files created and modified.
3. Components created.
4. Routes implemented.
5. Dependencies added or removed, with reasons.
6. Commands executed and their results.
7. Screens tested and responsive behaviour verified.
8. Any remaining issues.
9. Acceptance criteria completed and evidence for each.

Do not mark the feature VERIFIED unless its acceptance criteria have been tested.

Update the feature index with the correct implementation status.

**Final instruction:** Build a coherent, professional AgriConnect visual foundation. Do not interpret this specification as permission to invent additional product functionality or redesign unrelated architecture.