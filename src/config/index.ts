export const APP_CONFIG = {
  name: "Urban Flood Prediction & Early Warning System",
  version: "0.1.0",
  defaultMapCenter: [13.0827, 80.2707] as [number, number],
  defaultZoom: 12,
  telemetryFreshnessThresholdMinutes: 15,
  emergencyHotline: "112",
} as const;
