# AgriConnect

AgriConnect connects Kenyan farmers with buyers seeking available agricultural produce.

## Local setup

Requirements: Node.js 24 and PostgreSQL.

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local` and add the Clerk development keys and PostgreSQL connection string.
3. Create a development application in the [Clerk Dashboard](https://dashboard.clerk.com/) and use its publishable and secret keys.
4. Apply the development database migration with `npm run db:migrate`.
5. Start the app with `npm run dev` and open [http://localhost:3000](http://localhost:3000).

The Prisma CLI loads `.env.local` or `.env`. Keep both files out of version control; `.env.example` contains placeholders only.
Use `db:migrate` only with a development database, never a production database.

## Available scripts

- `npm run dev` — start the Next.js development server
- `npm run build` — generate Prisma Client and build for production
- `npm start` — serve the production build
- `npm run lint` — run ESLint
- `npm test` — run Vitest unit tests
- `npm run db:generate` — regenerate Prisma Client
- `npm run db:migrate` — create and apply a development migration

The App Router source is in `src/app`. Shared components are in `src/components`, feature logic in `src/features`, server utilities in `src/lib`, and the Prisma schema and migrations are in `prisma`.
