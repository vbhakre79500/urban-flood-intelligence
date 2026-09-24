import { z } from "zod";
import { riskLevelSchema } from "./zones";

export const riskDriverSchema = z.object({
  factor: z.string().min(1),
  contributionScore: z.number().min(0).max(100),
  description: z.string(),
});
export type RiskDriver = z.infer<typeof riskDriverSchema>;

export const predictionSchema = z.object({
  id: z.string().uuid(),
  zoneId: z.string().uuid(),
  riskLevel: riskLevelSchema,
  confidenceScore: z.number().min(0).max(1),
  predictedRainfallMm: z.number().nonnegative(),
  predictedWaterLevelMeters: z.number().nonnegative(),
  forecastWindowStart: z.date(),
  forecastWindowEnd: z.date(),
  dataFreshnessMinutes: z.number().int().nonnegative(),
  riskDrivers: z.array(riskDriverSchema),
  modelVersion: z.string(),
  isDegradedMode: z.boolean().default(false),
  generatedAt: z.date(),
  createdAt: z.date(),
});

export type Prediction = z.infer<typeof predictionSchema>;

export const queryPredictionsSchema = z.object({
  zoneId: z.string().uuid().optional(),
  minRiskLevel: riskLevelSchema.optional(),
  includeDegraded: z.boolean().default(true),
  limit: z.number().int().positive().max(100).default(50),
});
export type QueryPredictionsInput = z.infer<typeof queryPredictionsSchema>;
