import { pgTable, text, timestamp, uuid, pgEnum, index } from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", ["CITIZEN", "AUTHORITY", "ADMIN"]);

export const profiles = pgTable(
  "profiles",
  {
    id: uuid("id").primaryKey(), // maps 1:1 with auth.users.id from Supabase Auth
    role: userRoleEnum("role").default("CITIZEN").notNull(),
    fullName: text("full_name"),
    email: text("email").notNull().unique(),
    phone: text("phone"),
    department: text("department"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("idx_profiles_role").on(table.role),
    index("idx_profiles_email").on(table.email),
  ]
);

export type ProfileRecord = typeof profiles.$inferSelect;
export type NewProfileRecord = typeof profiles.$inferInsert;
