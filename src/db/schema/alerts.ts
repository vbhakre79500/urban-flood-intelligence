import {
  pgTable,
  text,
  timestamp,
  uuid,
  pgEnum,
  jsonb,
  index,
} from "drizzle-orm/pg-core";
import { zones } from "./zones";
import { profiles } from "./profiles";

export const alertSeverityEnum = pgEnum("alert_severity", [
  "ADVISORY",
  "WATCH",
  "WARNING",
  "EMERGENCY",
]);

export const alertStatusEnum = pgEnum("alert_status", [
  "DRAFT",
  "ACTIVE",
  "ACKNOWLEDGED",
  "RESOLVED",
  "EXPIRED",
]);

export const alerts = pgTable(
  "alerts",
  {
    id: uuid("id").primaryKey(),
    zoneId: uuid("zone_id")
      .notNull()
      .references(() => zones.id, { onDelete: "cascade" }),
    severity: alertSeverityEnum("severity").notNull(),
    status: alertStatusEnum("status").default("DRAFT").notNull(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    actionGuidelines: jsonb("action_guidelines").notNull(), // string[]
    issuedBy: uuid("issued_by")
      .notNull()
      .references(() => profiles.id, { onDelete: "restrict" }),
    issuedAt: timestamp("issued_at", { withTimezone: true }).defaultNow().notNull(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    resolvedAt: timestamp("resolved_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("idx_alerts_zone_id").on(table.zoneId),
    index("idx_alerts_severity").on(table.severity),
    index("idx_alerts_status").on(table.status),
    index("idx_alerts_expires_at").on(table.expiresAt),
  ]
);

export type AlertRecord = typeof alerts.$inferSelect;
export type NewAlertRecord = typeof alerts.$inferInsert;
