import { AuthenticationError, AuthorizationError } from "@/lib/errors";
import { hasPermission, type Permission } from "@/lib/permissions";
import type { SessionUser } from "@/lib/auth/types";
import type { UserRole } from "@/schemas/auth";

/**
 * Server-side authorization guard ensuring an authenticated user session.
 */
export function requireUser(user: SessionUser | null | undefined): SessionUser {
  if (!user || !user.id) {
    throw new AuthenticationError("Authentication required to perform this action");
  }
  return user;
}

/**
 * Server-side authorization guard enforcing required user role(s).
 */
export function requireRole(user: SessionUser | null | undefined, allowedRoles: UserRole[]): SessionUser {
  const verifiedUser = requireUser(user);
  if (!allowedRoles.includes(verifiedUser.role)) {
    throw new AuthorizationError(
      `Access denied. Required role: [${allowedRoles.join(", ")}], current role: ${verifiedUser.role}`
    );
  }
  return verifiedUser;
}

/**
 * Server-side authorization guard enforcing specific granular permission.
 */
export function requirePermission(user: SessionUser | null | undefined, permission: Permission): SessionUser {
  const verifiedUser = requireUser(user);
  if (!hasPermission(verifiedUser.role, permission)) {
    throw new AuthorizationError(`Access denied. Missing required permission: ${permission}`);
  }
  return verifiedUser;
}
