import { alertService } from "@/server/services/alert.service";
import type { CreateAlertInput } from "@/schemas/alerts";
import type { SessionUser } from "@/lib/auth/types";
import type { AlertRecord } from "@/db/schema";

export async function executeCreateAlert(input: CreateAlertInput, currentUser: SessionUser): Promise<AlertRecord> {
  return await alertService.createAlertTransaction(input, currentUser);
}
