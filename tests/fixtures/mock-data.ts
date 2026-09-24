export const mockZoneFixture = {
  id: "4fa85f64-5717-4562-b3fc-2c963f66afa6",
  code: "ZN-COASTAL-03",
  name: "Estuary Marshlands",
  district: "South Coastal",
  baselineRisk: "CRITICAL" as const,
  elevationMeters: 3.2,
  drainageCapacityScore: 20,
  centerLat: 13.0512,
  centerLng: 80.2825,
  populationDensity: 6900,
  criticalInfrastructureCount: 6,
  isActive: true,
  createdAt: new Date("2026-01-01T00:00:00Z"),
  updatedAt: new Date("2026-01-01T00:00:00Z"),
};

export const mockAlertFixture = {
  zoneId: "4fa85f64-5717-4562-b3fc-2c963f66afa6",
  severity: "EMERGENCY" as const,
  title: "Flash Inundation Emergency Warning",
  description: "Immediate threat of low-lying submergence in estuary sector.",
  actionGuidelines: ["Deploy flood barriers", "Evacuate underpass zones"],
  expiresInHours: 6,
};
