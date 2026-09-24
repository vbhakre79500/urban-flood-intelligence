import { predictionRepository } from "@/server/repositories/prediction.repository";
import type { PredictionRecord } from "@/db/schema";

export class PredictionService {
  async getLatestPredictions(): Promise<PredictionRecord[]> {
    return await predictionRepository.findAllLatest();
  }

  async getZonePrediction(zoneId: string): Promise<PredictionRecord | null> {
    return await predictionRepository.findLatestByZone(zoneId);
  }
}

export const predictionService = new PredictionService();
