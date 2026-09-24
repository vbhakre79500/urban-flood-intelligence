/**
 * Centralized Application Error Architecture
 * Standardized typed error taxonomy preventing sensitive data leakage.
 */

export type ErrorCategory =
  | "VALIDATION_ERROR"
  | "AUTHENTICATION_ERROR"
  | "AUTHORIZATION_ERROR"
  | "NOT_FOUND"
  | "CONFLICT"
  | "RATE_LIMITED"
  | "NETWORK_ERROR"
  | "DATABASE_ERROR"
  | "EXTERNAL_SERVICE_ERROR"
  | "INTERNAL_ERROR";

export interface SerializedAppError {
  category: ErrorCategory;
  message: string;
  statusCode: number;
  timestamp: string;
  requestId?: string;
  fieldErrors?: Record<string, string[]>;
}

export class AppError extends Error {
  public readonly category: ErrorCategory;
  public readonly statusCode: number;
  public readonly timestamp: string;
  public readonly fieldErrors?: Record<string, string[]>;
  public readonly isOperational: boolean;

  constructor(
    category: ErrorCategory,
    message: string,
    statusCode: number,
    options?: {
      fieldErrors?: Record<string, string[]>;
      cause?: unknown;
      isOperational?: boolean;
    }
  ) {
    super(message, { cause: options?.cause });
    this.name = "AppError";
    this.category = category;
    this.statusCode = statusCode;
    this.timestamp = new Date().toISOString();
    this.fieldErrors = options?.fieldErrors;
    this.isOperational = options?.isOperational ?? true;
  }

  public toJSON(requestId?: string): SerializedAppError {
    return {
      category: this.category,
      message: this.message,
      statusCode: this.statusCode,
      timestamp: this.timestamp,
      requestId,
      ...(this.fieldErrors ? { fieldErrors: this.fieldErrors } : {}),
    };
  }
}

export class ValidationError extends AppError {
  constructor(message: string, fieldErrors?: Record<string, string[]>, cause?: unknown) {
    super("VALIDATION_ERROR", message, 400, { fieldErrors, cause });
  }
}

export class AuthenticationError extends AppError {
  constructor(message = "Authentication required or session expired", cause?: unknown) {
    super("AUTHENTICATION_ERROR", message, 401, { cause });
  }
}

export class AuthorizationError extends AppError {
  constructor(message = "Insufficient permissions for requested resource", cause?: unknown) {
    super("AUTHORIZATION_ERROR", message, 403, { cause });
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string, identifier?: string, cause?: unknown) {
    super(
      "NOT_FOUND",
      identifier ? `${resource} with identifier '${identifier}' was not found` : `${resource} was not found`,
      404,
      { cause }
    );
  }
}

export class ConflictError extends AppError {
  constructor(message: string, cause?: unknown) {
    super("CONFLICT", message, 409, { cause });
  }
}

export class DatabaseError extends AppError {
  constructor(message = "Database operation failed", cause?: unknown) {
    // Sanitized for external client consumption; underlying cause retained for server logging
    super("DATABASE_ERROR", message, 500, { cause, isOperational: true });
  }
}

export class InternalServerError extends AppError {
  constructor(message = "An unexpected server error occurred", cause?: unknown) {
    super("INTERNAL_ERROR", message, 500, { cause, isOperational: false });
  }
}
