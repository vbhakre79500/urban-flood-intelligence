import { db } from "@/db";
import { alerts, type AlertRecord, type NewAlertRecord } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import type { Database } from "@/db";

export class AlertRepository {
  async findAllActive(): Promise<AlertRecord[]> {
    return await db
      .select()
      .from(alerts)
      .where(eq(alerts.status, "ACTIVE"))
      .orderBy(desc(alerts.issuedAt));
  }

  async findById(id: string): Promise<AlertRecord | null> {
    const records = await db.select().from(alerts).where(eq(alerts.id, id)).limit(1);
    return records[0] ?? null;
  }

  async create(
    data: NewAlertRecord,
    tx?: Parameters<Parameters<Database["transaction"]>[0]>[0]
  ): Promise<AlertRecord> {
    const executor = tx ?? db;
    const records = await executor.insert(alerts).values(data).returning();
    const created = records[0];
    if (!created) {
      throw new Error("Failed to insert alert record");
    }
    return created;
  }
}

export const alertRepository = new AlertRepository();
