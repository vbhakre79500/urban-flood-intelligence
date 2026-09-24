import {
  pgTable,
  text,
  timestamp,
  uuid,
  pgEnum,
  doublePrecision,
  integer,
  boolean,
  jsonb,
  index,
} from "drizzle-orm/pg-core";

export const riskLevelEnum = pgEnum("risk_level", ["LOW", "MODERATE", "HIGH", "CRITICAL"]);

export const zones = pgTable(
  "zones",
  {
    id: uuid("id").primaryKey(),
    code: text("code").notNull().unique(),
    name: text("name").notNull(),
    district: text("district").notNull(),
    baselineRisk: riskLevelEnum("baseline_risk").default("LOW").notNull(),
    elevationMeters: doublePrecision("elevation_meters").notNull(),
    drainageCapacityScore: integer("drainage_capacity_score").notNull(),
    centerLat: doublePrecision("center_lat").notNull(),
    centerLng: doublePrecision("center_lng").notNull(),
    boundaryGeojson: jsonb("boundary_geojson"),
    populationDensity: integer("population_density"),
    criticalInfrastructureCount: integer("critical_infrastructure_count").default(0).notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("idx_zones_district").on(table.district),
    index("idx_zones_baseline_risk").on(table.baselineRisk),
    index("idx_zones_is_active").on(table.isActive),
  ]
);

export type ZoneRecord = typeof zones.$inferSelect;
export type NewZoneRecord = typeof zones.$inferInsert;
