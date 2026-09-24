# Urban Flood Prediction & Early Warning System

An operational intelligence platform for municipal flood prediction, zone-wise risk assessment, explainable hydrological drivers, and civil warning dispatch.

---

## 1. Technology Stack

- **Framework**: Next.js 15 (App Router, React 19, TypeScript 5.8 in Strict Mode)
- **Styling**: Tailwind CSS v4, CSS Custom Property design tokens
- **Database**: PostgreSQL 16 with Drizzle ORM and `postgres` pooler
- **Authentication**: Supabase Auth (SSR Cookies, PostgreSQL RLS)
- **State Management**:
  - Server State: TanStack Query v5
  - Client UI State: Zustand
- **Boundary Validation**: Zod
- **Testing**: Vitest, React Testing Library, JSDOM

---

## 2. Prerequisites

- **Node.js**: v20.x or v24.x LTS (verified with v24.18.0)
- **npm**: v10.x or v11.x (verified with v11.18.0)
- **PostgreSQL 16**: Local instance or hosted via Supabase / Neon

---

## 3. Installation & Setup

```bash
# 1. Clone and install dependencies
npm install

# 2. Configure environment
cp .env.example .env.local
# Edit .env.local with your database and Supabase keys

# 3. Validate environment configuration
npm run validate:env
```

---

## 4. Database Setup

```bash
# Generate Drizzle migration schema
npm run db:generate

# Push schema directly to development database
npm run db:push

# Seed simulated development data (never run in production!)
npm run seed
```

---

## 5. Development & Verification Commands

```bash
# Start local development server (http://localhost:3000)
npm run dev

# Run TypeScript strict typecheck
npm run typecheck

# Run ESLint analysis
npm run lint

# Run automated unit & integration test suites
npm test

# Verify operational health endpoint
npm run health:check

# Production build verification
npm run build
```

---

## 6. Repository Topology

```text
/
├── brain.md                 # System memory, architectural guardrails & status
├── README.md                # Engineering documentation
├── drizzle.config.ts        # Drizzle ORM configuration
├── next.config.ts           # Next.js 15 production configuration
├── postcss.config.mjs       # Tailwind CSS v4 PostCSS configuration
├── tsconfig.json            # TypeScript strict compiler options
│
├── docs/                    # Architectural specifications (PRD, TRD, ARCHITECTURE, etc.)
├── public/                  # Public assets, icons, and imagery
├── scripts/                 # Operational scripts (seed, validate-env, health-check)
│
├── src/
│   ├── app/                 # Next.js App Router (Public, Protected /app, API routes)
│   ├── components/          # Design token primitives (ui/) and layout shells
│   ├── db/                  # Drizzle ORM schemas, connection, migrations, seeds
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Auth, logging, errors, permissions, and utils
│   ├── schemas/             # Zod external boundary validation schemas
│   ├── server/              # Actions, queries, mutations, services, repositories
│   └── stores/              # Zustand client-only state stores
└── tests/                   # Unit, integration, and E2E test suites
```

---

## 7. Architecture & Guardrail Principles

1. **Strict RSC Default**: React Server Components by default; `"use client"` restricted to stateful interactive boundaries.
2. **Import Direction**: `UI Component -> Service -> Repository -> Database`. Direct database access inside UI components is strictly prohibited.
3. **Zod Boundary Enforcement**: All request payloads, URL parameters, and environment configs pass through Zod parsing.
4. **Transactional Integrity**: All multi-record mutations (e.g. alert creation + compliance audit logging) execute in atomic transactions.
5. **No `any` Prohibited**: Zero tolerance for `any`, `@ts-ignore`, or silent type escape hatches.
