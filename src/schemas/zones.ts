import { z } from "zod";

export const riskLevelSchema = z.enum(["LOW", "MODERATE", "HIGH", "CRITICAL"]);
export type RiskLevel = z.infer<typeof riskLevelSchema>;

export const zoneSchema = z.object({
  id: z.string().uuid(),
  code: z.string().min(2).max(32),
  name: z.string().min(2).max(128),
  district: z.string().min(2).max(128),
  baselineRisk: riskLevelSchema,
  elevationMeters: z.number(),
  drainageCapacityScore: z.number().min(0).max(100),
  boundaryCoordinates: z.array(z.tuple([z.number(), z.number()])).optional(),
  centerLat: z.number().min(-90).max(90),
  centerLng: z.number().min(-180).max(180),
  populationDensity: z.number().nonnegative().optional(),
  criticalInfrastructureCount: z.number().int().nonnegative().default(0),
  isActive: z.boolean().default(true),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Zone = z.infer<typeof zoneSchema>;

export const createZoneInputSchema = zoneSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateZoneInput = z.infer<typeof createZoneInputSchema>;

export const updateZoneInputSchema = createZoneInputSchema.partial();
export type UpdateZoneInput = z.infer<typeof updateZoneInputSchema>;
