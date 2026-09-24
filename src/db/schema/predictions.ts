import {
  pgTable,
  text,
  timestamp,
  uuid,
  doublePrecision,
  integer,
  boolean,
  jsonb,
  index,
} from "drizzle-orm/pg-core";
import { zones, riskLevelEnum } from "./zones";

export const predictions = pgTable(
  "predictions",
  {
    id: uuid("id").primaryKey(),
    zoneId: uuid("zone_id")
      .notNull()
      .references(() => zones.id, { onDelete: "cascade" }),
    riskLevel: riskLevelEnum("risk_level").notNull(),
    confidenceScore: doublePrecision("confidence_score").notNull(),
    predictedRainfallMm: doublePrecision("predicted_rainfall_mm").notNull(),
    predictedWaterLevelMeters: doublePrecision("predicted_water_level_meters").notNull(),
    forecastWindowStart: timestamp("forecast_window_start", { withTimezone: true }).notNull(),
    forecastWindowEnd: timestamp("forecast_window_end", { withTimezone: true }).notNull(),
    dataFreshnessMinutes: integer("data_freshness_minutes").notNull(),
    riskDrivers: jsonb("risk_drivers").notNull(),
    modelVersion: text("model_version").notNull(),
    isDegradedMode: boolean("is_degraded_mode").default(false).notNull(),
    generatedAt: timestamp("generated_at", { withTimezone: true }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("idx_predictions_zone_id").on(table.zoneId),
    index("idx_predictions_risk_level").on(table.riskLevel),
    index("idx_predictions_window_start").on(table.forecastWindowStart),
    index("idx_predictions_generated_at").on(table.generatedAt),
  ]
);

export type PredictionRecord = typeof predictions.$inferSelect;
export type NewPredictionRecord = typeof predictions.$inferInsert;
