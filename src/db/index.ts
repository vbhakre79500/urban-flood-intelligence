import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

/**
 * PostgreSQL connection pooling client for Drizzle ORM.
 * Compatible with Supabase and Neon.
 */
const connectionString = process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/urban_flood_db";

// Global cache for connection in development to prevent connection exhaustion
const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined;
};

const client =
  globalForDb.conn ??
  postgres(connectionString, {
    max: process.env.NODE_ENV === "production" ? 20 : 5,
    idle_timeout: 30,
    connect_timeout: 10,
    prepare: false, // Required for transaction poolers like Supabase Supavisor
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.conn = client;
}

export const db = drizzle(client, { schema });
export type Database = typeof db;
export { schema };
