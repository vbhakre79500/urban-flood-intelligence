import { describe, it, expect } from "vitest";
import { generateUUIDv7, isValidUUID } from "@/lib/utils/uuid";

describe("UUIDv7 Generation & Validation", () => {
  it("should generate a valid RFC 9562 UUIDv7", () => {
    const uuid = generateUUIDv7();
    expect(uuid).toBeDefined();
    expect(typeof uuid).toBe("string");
    expect(isValidUUID(uuid)).toBe(true);

    // Verify version 7 indicator at position 14 (8-4-4-4-12)
    const parts = uuid.split("-");
    expect(parts[2]?.startsWith("7")).toBe(true);
  });

  it("should generate monotonically sortable identifiers", async () => {
    const id1 = generateUUIDv7();
    // Millisecond resolution check
    await new Promise((resolve) => setTimeout(resolve, 5));
    const id2 = generateUUIDv7();

    expect(id2 > id1).toBe(true);
  });
});
