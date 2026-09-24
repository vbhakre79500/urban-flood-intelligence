import { describe, it, expect } from "vitest";
import { zoneSchema, createAlertInputSchema } from "@/schemas";
import { mockZoneFixture, mockAlertFixture } from "../fixtures/mock-data";

describe("Entity Zod Boundary Validation", () => {
  it("should validate a compliant zone schema entity", () => {
    const result = zoneSchema.safeParse(mockZoneFixture);
    expect(result.success).toBe(true);
  });

  it("should reject zone with coordinates out of bounds", () => {
    const invalidZone = {
      ...mockZoneFixture,
      centerLat: 195.0, // Invalid latitude (> 90)
    };
    const result = zoneSchema.safeParse(invalidZone);
    expect(result.success).toBe(false);
  });

  it("should validate a valid alert creation input", () => {
    const result = createAlertInputSchema.safeParse(mockAlertFixture);
    expect(result.success).toBe(true);
  });

  it("should reject alert input without action guidelines", () => {
    const invalidAlert = {
      ...mockAlertFixture,
      actionGuidelines: [], // At least one is required
    };
    const result = createAlertInputSchema.safeParse(invalidAlert);
    expect(result.success).toBe(false);
  });
});
