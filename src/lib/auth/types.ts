import type { UserRole } from "@/schemas/auth";

export type AuthState =
  | "UNAUTHENTICATED"
  | "AUTHENTICATING"
  | "AUTHENTICATED"
  | "ONBOARDING"
  | "SESSION_REFRESHING"
  | "REAUTHENTICATION_REQUIRED"
  | "LOGGING_OUT"
  | "AUTH_ERROR";

export interface SessionUser {
  id: string;
  email: string;
  role: UserRole;
  fullName: string | null;
  department: string | null;
}

export interface AuthSession {
  user: SessionUser;
  expiresAt: number;
}
