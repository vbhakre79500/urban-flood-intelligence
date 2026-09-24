# System Architecture & Layer Boundaries

## 1. Architectural Layers
```text
Client (Browser)
   │
   ▼
Edge Middleware (src/middleware.ts) ──> Supabase Session Refresh
   │
   ▼
Presentation (React Server Components / Client Components)
   │
   ▼
Validation Boundary (src/schemas/ ──> Zod Safe Parsing)
   │
   ▼
Server Actions & API Routes (src/server/actions/ & src/app/api/)
   │
   ▼
Authorization Guards (src/server/authorization/)
   │
   ▼
Domain Services (src/server/services/)
   │
   ▼
Repositories (src/server/repositories/)
   │
   ▼
Drizzle ORM & Connection Pool (src/db/)
   │
   ▼
PostgreSQL 16 (Row Level Security Enforced)
```

## 2. Invariant Rules
1. Components must NEVER directly query or mutate the database.
2. All external inputs must pass through Zod schemas before being passed to business logic.
3. Multi-record operations (e.g. creating alerts and audit logs) MUST execute inside atomic transactions.
4. Server secrets are strictly quarantined from `NEXT_PUBLIC_*` scope.
