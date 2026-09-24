# Technical Requirements Document (TRD)

## Urban Flood Prediction & Early Warning System

### 1. Architectural Foundations
- **Runtime**: Node.js 20+ / Node.js 24 LTS, TypeScript 5.x with `strict: true`.
- **Framework**: Next.js 15 App Router with React 19 Server Components by default.
- **Styling**: Tailwind CSS v4 with `@tailwindcss/postcss` and CSS Custom Properties for theme tokens.
- **Database**: PostgreSQL 16 managed via Drizzle ORM and `postgres` connection pooler.
- **Auth**: Supabase SSR Auth with secure HTTP-only cookies and PostgreSQL Row Level Security (RLS).
- **State Separation**:
  - TanStack Query v5 for server data, caching, and background refetching.
  - Zustand for client-side UI states (sidebar, modals, map viewport).
- **Boundary Validation**: Zod schema enforcement across all HTTP, database, and environment inputs.

### 2. Guardrails & Prohibitions
- Strictly no `any`, `as any`, `@ts-ignore`, or `@ts-nocheck`.
- No direct database imports in UI components (`Component -> Service -> Repository -> DB`).
- No client-trusted identity, role, or authorization attributes.
- No sensitive keys in `NEXT_PUBLIC_*` scope.
- All multi-record mutations must execute within PostgreSQL transactions.
- Zero mock data masquerading as operational production data.
