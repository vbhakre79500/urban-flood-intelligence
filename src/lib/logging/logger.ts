/**
 * Centralized Structured Server Logger
 * Enforces sanitization of credentials, secrets, and PII.
 */

export type LogLevel = "debug" | "info" | "warn" | "error";

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  event: string;
  requestId?: string;
  context?: string;
  metadata?: Record<string, unknown>;
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
}

const REDACTED_KEYS = new Set([
  "password",
  "token",
  "secret",
  "authorization",
  "cookie",
  "session",
  "key",
  "apiKey",
  "serviceRoleKey",
  "anonKey",
  "accessToken",
  "refreshToken",
]);

function sanitizeValue(key: string, value: unknown): unknown {
  if (typeof key === "string" && REDACTED_KEYS.has(key.toLowerCase())) {
    return "[REDACTED]";
  }

  if (value && typeof value === "object") {
    if (Array.isArray(value)) {
      return value.map((item, idx) => sanitizeValue(String(idx), item));
    }
    const sanitizedObj: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      sanitizedObj[k] = sanitizeValue(k, v);
    }
    return sanitizedObj;
  }

  return value;
}

class Logger {
  private formatLog(
    level: LogLevel,
    event: string,
    metadata?: Record<string, unknown>,
    options?: { requestId?: string; context?: string; error?: unknown }
  ): LogEntry {
    const sanitizedMetadata = metadata
      ? (sanitizeValue("metadata", metadata) as Record<string, unknown>)
      : undefined;

    let errorObj: LogEntry["error"] | undefined;
    if (options?.error instanceof Error) {
      errorObj = {
        name: options.error.name,
        message: options.error.message,
        stack: process.env.NODE_ENV === "development" ? options.error.stack : undefined,
      };
    } else if (options?.error) {
      errorObj = {
        name: "UnknownError",
        message: String(options.error),
      };
    }

    return {
      timestamp: new Date().toISOString(),
      level,
      event,
      requestId: options?.requestId,
      context: options?.context,
      metadata: sanitizedMetadata,
      error: errorObj,
    };
  }

  private output(entry: LogEntry): void {
    const formatted = JSON.stringify(entry);
    switch (entry.level) {
      case "error":
        console.error(formatted);
        break;
      case "warn":
        console.warn(formatted);
        break;
      case "debug":
        if (process.env.NODE_ENV !== "production") {
          console.debug(formatted);
        }
        break;
      case "info":
      default:
        console.log(formatted);
        break;
    }
  }

  public debug(event: string, metadata?: Record<string, unknown>, options?: { requestId?: string; context?: string }): void {
    this.output(this.formatLog("debug", event, metadata, options));
  }

  public info(event: string, metadata?: Record<string, unknown>, options?: { requestId?: string; context?: string }): void {
    this.output(this.formatLog("info", event, metadata, options));
  }

  public warn(event: string, metadata?: Record<string, unknown>, options?: { requestId?: string; context?: string; error?: unknown }): void {
    this.output(this.formatLog("warn", event, metadata, options));
  }

  public error(event: string, metadata?: Record<string, unknown>, options?: { requestId?: string; context?: string; error?: unknown }): void {
    this.output(this.formatLog("error", event, metadata, options));
  }
}

export const logger = new Logger();
