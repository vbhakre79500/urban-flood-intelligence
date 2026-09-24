import { describe, it, expect } from "vitest";
import { hasPermission } from "@/lib/permissions";

describe("Permissions Matrix Guardrails", () => {
  it("should permit Citizens only to view public telemetry", () => {
    expect(hasPermission("CITIZEN", "VIEW_PUBLIC_MAP")).toBe(true);
    expect(hasPermission("CITIZEN", "VIEW_PREDICTIONS")).toBe(true);
    expect(hasPermission("CITIZEN", "ISSUE_WARNINGS")).toBe(false);
    expect(hasPermission("CITIZEN", "MANAGE_ZONES")).toBe(false);
    expect(hasPermission("CITIZEN", "MANAGE_USERS")).toBe(false);
  });

  it("should permit Authority to issue warnings but not manage system users", () => {
    expect(hasPermission("AUTHORITY", "VIEW_PUBLIC_MAP")).toBe(true);
    expect(hasPermission("AUTHORITY", "ISSUE_WARNINGS")).toBe(true);
    expect(hasPermission("AUTHORITY", "MANAGE_ALERTS")).toBe(true);
    expect(hasPermission("AUTHORITY", "MANAGE_USERS")).toBe(false);
    expect(hasPermission("AUTHORITY", "VIEW_AUDIT_LOGS")).toBe(false);
  });

  it("should permit Admin full governance access", () => {
    expect(hasPermission("ADMIN", "VIEW_PUBLIC_MAP")).toBe(true);
    expect(hasPermission("ADMIN", "ISSUE_WARNINGS")).toBe(true);
    expect(hasPermission("ADMIN", "MANAGE_USERS")).toBe(true);
    expect(hasPermission("ADMIN", "VIEW_AUDIT_LOGS")).toBe(true);
  });
});
