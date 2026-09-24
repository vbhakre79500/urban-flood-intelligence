import {
  pgTable,
  text,
  timestamp,
  uuid,
  pgEnum,
  jsonb,
  index,
} from "drizzle-orm/pg-core";

export const dataSourceTypeEnum = pgEnum("data_source_type", [
  "WEATHER_RADAR",
  "RAIN_GAUGE",
  "STREAM_SENSOR",
  "TERRAIN_ELEVATION",
  "HISTORICAL_EVENT",
]);

export const dataSourceStatusEnum = pgEnum("data_source_status", [
  "ACTIVE",
  "DEGRADED",
  "OFFLINE",
  "SYNCING",
]);

export const dataSources = pgTable(
  "data_sources",
  {
    id: uuid("id").primaryKey(),
    name: text("name").notNull(),
    type: dataSourceTypeEnum("type").notNull(),
    status: dataSourceStatusEnum("status").default("ACTIVE").notNull(),
    lastSyncAt: timestamp("last_sync_at", { withTimezone: true }),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("idx_data_sources_type").on(table.type),
    index("idx_data_sources_status").on(table.status),
  ]
);

export type DataSourceRecord = typeof dataSources.$inferSelect;
export type NewDataSourceRecord = typeof dataSources.$inferInsert;
