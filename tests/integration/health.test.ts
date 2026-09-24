import { describe, it, expect } from "vitest";
import { GET } from "@/app/api/health/route";

describe("Health API Route", () => {
  it("should return healthy status response with required metadata", async () => {
    const response = await GET();
    expect(response.status).toBe(200);

    const json = await response.json();
    expect(json.status).toBe("healthy");
    expect(json.service).toBe("urban-flood-intelligence-platform");
    expect(json.timestamp).toBeDefined();
    expect(typeof json.uptime).toBe("number");
  });
});
