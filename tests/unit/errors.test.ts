import { describe, it, expect } from "vitest";
import { ValidationError, AuthenticationError, AuthorizationError } from "@/lib/errors";

describe("Application Error Architecture", () => {
  it("should serialize AppError safely without leaking stack trace", () => {
    const error = new ValidationError("Invalid parameters", { email: ["Invalid format"] });
    const serialized = error.toJSON("req-xyz-123");

    expect(serialized.category).toBe("VALIDATION_ERROR");
    expect(serialized.statusCode).toBe(400);
    expect(serialized.requestId).toBe("req-xyz-123");
    expect(serialized.fieldErrors).toEqual({ email: ["Invalid format"] });
    expect("stack" in serialized).toBe(false);
  });

  it("should properly assign HTTP status codes", () => {
    const authErr = new AuthenticationError();
    expect(authErr.statusCode).toBe(401);

    const permErr = new AuthorizationError();
    expect(permErr.statusCode).toBe(403);
  });
});
