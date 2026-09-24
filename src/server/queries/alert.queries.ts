import { alertService } from "@/server/services/alert.service";
import type { AlertRecord } from "@/db/schema";

export async function fetchActiveAlerts(): Promise<AlertRecord[]> {
  return await alertService.getActiveAlerts();
}
