import { describe, it, expect } from "vitest";
import { hasPermission, hasAllPermissions } from "@/lib/permissions";
import { loginSchema } from "@/schemas/auth";

describe("Role-Based Access Control & Role Separation", () => {
  it("enforces strict boundary: Citizen cannot issue warnings or manage alerts", () => {
    expect(hasPermission("CITIZEN", "ISSUE_WARNINGS")).toBe(false);
    expect(hasPermission("CITIZEN", "MANAGE_ALERTS")).toBe(false);
    expect(hasPermission("CITIZEN", "OVERRIDE_PREDICTIONS")).toBe(false);
    expect(hasPermission("CITIZEN", "CONFIGURE_SYSTEM")).toBe(false);
  });

  it("enforces strict boundary: Operator/Authority has operational control but no user/audit governance", () => {
    expect(hasPermission("AUTHORITY", "ISSUE_WARNINGS")).toBe(true);
    expect(hasPermission("AUTHORITY", "MANAGE_ALERTS")).toBe(true);
    expect(hasPermission("AUTHORITY", "OVERRIDE_PREDICTIONS")).toBe(true);
    expect(hasPermission("AUTHORITY", "MANAGE_USERS")).toBe(false);
    expect(hasPermission("AUTHORITY", "CONFIGURE_SYSTEM")).toBe(false);
    expect(hasPermission("AUTHORITY", "VIEW_AUDIT_LOGS")).toBe(false);
  });

  it("enforces admin role separation: Admin has all system permissions", () => {
    expect(
      hasAllPermissions("ADMIN", [
        "VIEW_PUBLIC_MAP",
        "ISSUE_WARNINGS",
        "MANAGE_USERS",
        "VIEW_AUDIT_LOGS",
        "CONFIGURE_SYSTEM",
      ])
    ).toBe(true);
  });

  it("validates login schema strictly rejecting invalid emails or short passwords", () => {
    const invalidEmail = loginSchema.safeParse({ email: "invalid-email", password: "AdminPassword#2026" });
    expect(invalidEmail.success).toBe(false);

    const shortPassword = loginSchema.safeParse({ email: "operator@flood.gov.in", password: "short" });
    expect(shortPassword.success).toBe(false);

    const validCreds = loginSchema.safeParse({ email: "operator@flood.gov.in", password: "AdminPassword#2026" });
    expect(validCreds.success).toBe(true);
  });
});
