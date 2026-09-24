import { zoneService } from "@/server/services/zone.service";
import type { ZoneRecord } from "@/db/schema";

export async function fetchActiveZones(): Promise<ZoneRecord[]> {
  return await zoneService.getActiveZones();
}

export async function fetchZoneById(id: string): Promise<ZoneRecord> {
  return await zoneService.getZoneById(id);
}
