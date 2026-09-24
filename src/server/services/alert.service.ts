import { db } from "@/db";
import { alertRepository } from "@/server/repositories/alert.repository";
import { auditRepository } from "@/server/repositories/audit.repository";
import { generateUUIDv7 } from "@/lib/utils/uuid";
import { requirePermission } from "@/server/authorization";
import { DatabaseError } from "@/lib/errors";
import { logger } from "@/lib/logging/logger";
import type { SessionUser } from "@/lib/auth/types";
import type { CreateAlertInput } from "@/schemas/alerts";
import type { AlertRecord } from "@/db/schema";

export class AlertService {
  /**
   * Creates an operational alert and an audit record inside a single atomic transaction.
   * Satisfies Section 12 Transaction Rule.
   */
  async createAlertTransaction(input: CreateAlertInput, currentUser: SessionUser): Promise<AlertRecord> {
    // 1. Authorize actor
    requirePermission(currentUser, "ISSUE_WARNINGS");

    const alertId = generateUUIDv7();
    const auditId = generateUUIDv7();
    const now = new Date();
    const expiresAt = new Date(now.getTime() + input.expiresInHours * 60 * 60 * 1000);

    try {
      // Execute atomically in a PostgreSQL transaction
      const result = await db.transaction(async (tx) => {
        // Step A: Insert Alert
        const createdAlert = await alertRepository.create(
          {
            id: alertId,
            zoneId: input.zoneId,
            severity: input.severity,
            status: "ACTIVE",
            title: input.title,
            description: input.description,
            actionGuidelines: input.actionGuidelines,
            issuedBy: currentUser.id,
            issuedAt: now,
            expiresAt,
            createdAt: now,
            updatedAt: now,
          },
          tx
        );

        // Step B: Record Audit Log
        await auditRepository.recordLog(
          {
            id: auditId,
            userId: currentUser.id,
            action: "ALERT_ISSUED",
            entityType: "ALERT",
            entityId: alertId,
            changes: {
              severity: input.severity,
              zoneId: input.zoneId,
              title: input.title,
            },
            createdAt: now,
          },
          tx
        );

        return createdAlert;
      });

      logger.info("Operational alert created transactionally", {
        alertId,
        zoneId: input.zoneId,
        issuerId: currentUser.id,
      });

      return result;
    } catch (error) {
      logger.error("Failed to execute alert creation transaction; rolled back.", {
        zoneId: input.zoneId,
        error,
      });
      throw new DatabaseError("Failed to issue operational alert transactionally", error);
    }
  }

  async getActiveAlerts(): Promise<AlertRecord[]> {
    return await alertRepository.findAllActive();
  }
}

export const alertService = new AlertService();
