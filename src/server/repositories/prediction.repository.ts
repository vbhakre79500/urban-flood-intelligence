import { db } from "@/db";
import { predictions, type PredictionRecord, type NewPredictionRecord } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export class PredictionRepository {
  async findLatestByZone(zoneId: string): Promise<PredictionRecord | null> {
    const records = await db
      .select()
      .from(predictions)
      .where(eq(predictions.zoneId, zoneId))
      .orderBy(desc(predictions.forecastWindowStart))
      .limit(1);
    return records[0] ?? null;
  }

  async findAllLatest(): Promise<PredictionRecord[]> {
    return await db
      .select()
      .from(predictions)
      .orderBy(desc(predictions.generatedAt))
      .limit(50);
  }

  async create(data: NewPredictionRecord): Promise<PredictionRecord> {
    const records = await db.insert(predictions).values(data).returning();
    const created = records[0];
    if (!created) {
      throw new Error("Failed to insert prediction record");
    }
    return created;
  }
}

export const predictionRepository = new PredictionRepository();
