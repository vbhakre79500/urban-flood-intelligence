import { describe, it, expect } from "vitest";
import { environmentSchema } from "@/schemas/environment";

describe("Environment Schema Validation", () => {
  it("should validate a valid environment configuration", () => {
    const validConfig = {
      NEXT_PUBLIC_APP_URL: "https://flood.gov.in",
      NEXT_PUBLIC_SUPABASE_URL: "https://project.supabase.co",
      NEXT_PUBLIC_SUPABASE_ANON_KEY: "test-anon-key-123456",
      SUPABASE_SERVICE_ROLE_KEY: "test-service-key-123456",
      DATABASE_URL: "postgresql://postgres:secret@localhost:5432/flood_db",
      NODE_ENV: "test",
    };

    const result = environmentSchema.safeParse(validConfig);
    expect(result.success).toBe(true);
  });

  it("should fail validation if required database url is missing", () => {
    const invalidConfig = {
      NEXT_PUBLIC_APP_URL: "https://flood.gov.in",
      NEXT_PUBLIC_SUPABASE_URL: "https://project.supabase.co",
      NEXT_PUBLIC_SUPABASE_ANON_KEY: "test-anon-key",
      SUPABASE_SERVICE_ROLE_KEY: "test-service-key",
      DATABASE_URL: "",
    };

    const result = environmentSchema.safeParse(invalidConfig);
    expect(result.success).toBe(false);
  });

  it("should fail validation if app url is malformed", () => {
    const invalidConfig = {
      NEXT_PUBLIC_APP_URL: "not-a-valid-url",
      NEXT_PUBLIC_SUPABASE_URL: "https://project.supabase.co",
      NEXT_PUBLIC_SUPABASE_ANON_KEY: "test-anon-key",
      SUPABASE_SERVICE_ROLE_KEY: "test-service-key",
      DATABASE_URL: "postgresql://localhost:5432/db",
    };

    const result = environmentSchema.safeParse(invalidConfig);
    expect(result.success).toBe(false);
  });
});
