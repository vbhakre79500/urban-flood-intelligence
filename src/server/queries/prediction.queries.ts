import { predictionService } from "@/server/services/prediction.service";
import type { PredictionRecord } from "@/db/schema";

export async function fetchLatestPredictions(): Promise<PredictionRecord[]> {
  return await predictionService.getLatestPredictions();
}

export async function fetchZonePrediction(zoneId: string): Promise<PredictionRecord | null> {
  return await predictionService.getZonePrediction(zoneId);
}
