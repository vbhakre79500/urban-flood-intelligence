import { zoneRepository } from "@/server/repositories/zone.repository";
import { NotFoundError } from "@/lib/errors";
import type { ZoneRecord } from "@/db/schema";

export class ZoneService {
  async getActiveZones(): Promise<ZoneRecord[]> {
    return await zoneRepository.findAll();
  }

  async getZoneById(id: string): Promise<ZoneRecord> {
    const zone = await zoneRepository.findById(id);
    if (!zone) {
      throw new NotFoundError("Zone", id);
    }
    return zone;
  }
}

export const zoneService = new ZoneService();
