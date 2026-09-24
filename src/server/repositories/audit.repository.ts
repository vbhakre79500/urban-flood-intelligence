import { db } from "@/db";
import { auditLogs, type NewAuditLogRecord, type AuditLogRecord } from "@/db/schema";
import type { Database } from "@/db";

export class AuditRepository {
  async recordLog(
    entry: NewAuditLogRecord,
    tx?: Parameters<Parameters<Database["transaction"]>[0]>[0]
  ): Promise<AuditLogRecord> {
    const executor = tx ?? db;
    const records = await executor.insert(auditLogs).values(entry).returning();
    const created = records[0];
    if (!created) {
      throw new Error("Failed to write audit log");
    }
    return created;
  }
}

export const auditRepository = new AuditRepository();
