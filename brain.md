# BRAIN.MD - Architectural Memory & Operational Log

## Project: Urban Flood Prediction & Early Warning System
**Role**: Principal Software Architect & Repository Initialization Agent  
**Current Phase**: Foundation Scaffolding & Guardrail Enforcement (Phase 1)

---

## 1. Architectural Guardrails & Enforced Invariants

### Type-Safety Guardrails
- Strict TypeScript (`strict: true`, `noImplicitAny: true`, `strictNullChecks: true`).
- Strictly prohibited: `any`, `as any`, `@ts-ignore`, `@ts-nocheck`.
- All external inputs must be validated with Zod before being processed.

### Layer Boundary & Import Direction
```text
UI Component / Page
       ↓
Server Action / API Route
       ↓
Authorization Guard (requireRole, requirePermission)
       ↓
Domain Service
       ↓
Repository
       ↓
Drizzle ORM & PostgreSQL Client
```
- Direct database imports in UI components (`@/db` or `@/db/schema`) are strictly prohibited.
- UI state is managed via Zustand. Server state is managed via TanStack Query. No database record caching inside Zustand.

### Security Invariants
- Zero trust on client identity or roles.
- Server-only secrets (`SUPABASE_SERVICE_ROLE_KEY`, `DATABASE_URL`, `R2_*`) must never be exposed via `NEXT_PUBLIC_*`.
- HTTP-only cookie-based sessions for Supabase Auth; no JWT storage in browser localStorage.
- PostgreSQL Row Level Security (RLS) policies prepared on all core tables.

### Transactional Mutations
- All multi-record operations (e.g. `AlertService.createAlertTransaction`) execute inside atomic PostgreSQL transactions (`db.transaction(async (tx) => ...)`).
- If any audit log or secondary relation fails, the entire transaction rolls back.

### Mock Data Invariant
- Any placeholder or synthetic data must be explicitly labeled with `[SIMULATED_DEV_DATA]` or `[MOCK]` to ensure it is never confused with live civil telemetry.

---

## 2. Directory Topology Checklist

- [x] `brain.md` (Repository root)
- [x] `README.md`
- [x] `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `drizzle.config.ts`
- [x] `.env.example` & `.env.local`
- [x] `src/app/` (Root layout, public routes, app routes, admin routes, API routes)
- [x] `src/components/ui/` (21 design token primitives: Button, Input, Select, Badge, Card, etc.)
- [x] `src/components/layout/` (PublicShell, AuthShell, AppShell, AdminShell)
- [x] `src/db/` (Schema, client pooler, migrations dir, seed template)
- [x] `src/lib/` (Auth, permissions, errors, logging, utils, uuid)
- [x] `src/schemas/` (Zod schemas for env, auth, zones, predictions, alerts, notifications)
- [x] `src/server/` (Actions, queries, mutations, services, repositories, authorization)
- [x] `src/stores/` (Zustand ui-store, map-store)
- [x] `tests/` (Unit, integration, e2e, fixtures, vitest setup)
- [x] `docs/` (PRD, TRD, UI-UX-BRIEF, APP-FLOW, ARCHITECTURE, API, DATABASE)
- [x] `scripts/` (validate-env, health-check, seed)
- [x] `public/` (icons, images, assets)

---

## 3. Operational Log & Foundation Status
- Foundation scaffolding complete.
- Strict Next.js 15 App Router + Tailwind v4 + Drizzle + Supabase + TanStack Query + Zustand operational.
- Validation scripts, unit tests, and production build ready for verification.
