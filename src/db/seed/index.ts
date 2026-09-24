import { generateUUIDv7 } from "../../lib/utils/uuid";

/**
 * Seed data for development and testing environments.
 * Explicitly demarcated as SIMULATED DEVELOPMENT DATA to avoid mistaking for real operational data.
 */
export const IS_SIMULATED_DATA = true;

export const seedZones = [
  {
    id: generateUUIDv7(),
    code: "DEV-ZN-RIVERFRONT-01",
    name: "[MOCK] Central Riverfront Basin",
    district: "Downtown North",
    baselineRisk: "HIGH" as const,
    elevationMeters: 12.4,
    drainageCapacityScore: 35,
    centerLat: 13.0827,
    centerLng: 80.2707,
    populationDensity: 8500,
    criticalInfrastructureCount: 4,
    isActive: true,
  },
  {
    id: generateUUIDv7(),
    code: "DEV-ZN-UPTOWN-02",
    name: "[MOCK] Highland Plateau Sector",
    district: "West Hills",
    baselineRisk: "LOW" as const,
    elevationMeters: 48.6,
    drainageCapacityScore: 82,
    centerLat: 13.0901,
    centerLng: 80.245,
    populationDensity: 4200,
    criticalInfrastructureCount: 1,
    isActive: true,
  },
  {
    id: generateUUIDv7(),
    code: "DEV-ZN-COASTAL-03",
    name: "[MOCK] Estuary Marshlands",
    district: "South Coastal",
    baselineRisk: "CRITICAL" as const,
    elevationMeters: 3.2,
    drainageCapacityScore: 20,
    centerLat: 13.0512,
    centerLng: 80.2825,
    populationDensity: 6900,
    criticalInfrastructureCount: 6,
    isActive: true,
  },
];

export async function runSeed(): Promise<void> {
  console.log("🌱 Executing development seed script...");
  console.log("⚠️ NOTICE: Seeding [SIMULATED DEVELOPMENT DATA]. Never run this in operational production.");
  console.log(`Generated ${seedZones.length} simulated zones.`);
}
