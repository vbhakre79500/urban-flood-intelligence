/**
 * Utility formatters for metrics, rainfall, and water levels.
 */
export function formatRainfall(mm: number): string {
  return `${mm.toFixed(1)} mm`;
}

export function formatWaterLevel(meters: number): string {
  const sign = meters >= 0 ? "+" : "";
  return `${sign}${meters.toFixed(2)} m`;
}

export function formatConfidence(score: number): string {
  return `${Math.round(score * 100)}%`;
}
