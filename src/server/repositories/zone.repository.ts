import { db } from "@/db";
import { zones, type ZoneRecord, type NewZoneRecord } from "@/db/schema";
import { eq } from "drizzle-orm";

export class ZoneRepository {
  async findAll(): Promise<ZoneRecord[]> {
    return await db.select().from(zones).where(eq(zones.isActive, true));
  }

  async findById(id: string): Promise<ZoneRecord | null> {
    const records = await db.select().from(zones).where(eq(zones.id, id)).limit(1);
    return records[0] ?? null;
  }

  async findByCode(code: string): Promise<ZoneRecord | null> {
    const records = await db.select().from(zones).where(eq(zones.code, code)).limit(1);
    return records[0] ?? null;
  }

  async create(data: NewZoneRecord): Promise<ZoneRecord> {
    const records = await db.insert(zones).values(data).returning();
    const created = records[0];
    if (!created) {
      throw new Error("Failed to create zone record");
    }
    return created;
  }
}

export const zoneRepository = new ZoneRepository();
