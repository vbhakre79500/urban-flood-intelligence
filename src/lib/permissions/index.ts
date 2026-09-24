import type { UserRole } from "@/schemas/auth";

export type Permission =
  | "VIEW_PUBLIC_MAP"
  | "VIEW_PREDICTIONS"
  | "VIEW_ZONE_DETAILS"
  | "VIEW_ALERTS"
  | "RECEIVE_NOTIFICATIONS"
  | "MANAGE_ALERTS"
  | "ISSUE_WARNINGS"
  | "OVERRIDE_PREDICTIONS"
  | "MANAGE_ZONES"
  | "MANAGE_USERS"
  | "VIEW_AUDIT_LOGS"
  | "CONFIGURE_SYSTEM"
  | "MANAGE_DATA_SOURCES";

const ROLE_PERMISSIONS: Record<UserRole, ReadonlySet<Permission>> = {
  CITIZEN: new Set([
    "VIEW_PUBLIC_MAP",
    "VIEW_PREDICTIONS",
    "VIEW_ZONE_DETAILS",
    "VIEW_ALERTS",
    "RECEIVE_NOTIFICATIONS",
  ]),
  AUTHORITY: new Set([
    "VIEW_PUBLIC_MAP",
    "VIEW_PREDICTIONS",
    "VIEW_ZONE_DETAILS",
    "VIEW_ALERTS",
    "RECEIVE_NOTIFICATIONS",
    "MANAGE_ALERTS",
    "ISSUE_WARNINGS",
    "OVERRIDE_PREDICTIONS",
    "MANAGE_DATA_SOURCES",
  ]),
  ADMIN: new Set([
    "VIEW_PUBLIC_MAP",
    "VIEW_PREDICTIONS",
    "VIEW_ZONE_DETAILS",
    "VIEW_ALERTS",
    "RECEIVE_NOTIFICATIONS",
    "MANAGE_ALERTS",
    "ISSUE_WARNINGS",
    "OVERRIDE_PREDICTIONS",
    "MANAGE_ZONES",
    "MANAGE_USERS",
    "VIEW_AUDIT_LOGS",
    "CONFIGURE_SYSTEM",
    "MANAGE_DATA_SOURCES",
  ]),
};

/**
 * Check if a role possesses a specific operational permission.
 */
export function hasPermission(role: UserRole, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.has(permission) ?? false;
}

/**
 * Check if a role has all required permissions.
 */
export function hasAllPermissions(role: UserRole, permissions: Permission[]): boolean {
  return permissions.every((p) => hasPermission(role, p));
}

/**
 * Check if a role has at least one of the specified permissions.
 */
export function hasAnyPermission(role: UserRole, permissions: Permission[]): boolean {
  return permissions.some((p) => hasPermission(role, p));
}
