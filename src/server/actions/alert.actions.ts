"use server";

import { createAlertInputSchema, type CreateAlertInput } from "@/schemas/alerts";
import { executeCreateAlert } from "@/server/mutations/alert.mutations";
import { createServerSupabaseClient } from "@/lib/auth/supabase-server";
import { AppError, AuthenticationError } from "@/lib/errors";
import { logger } from "@/lib/logging/logger";
import type { SessionUser } from "@/lib/auth/types";
import type { UserRole } from "@/schemas/auth";

export interface ActionResult<T> {
  success: boolean;
  data?: T;
  error?: {
    category: string;
    message: string;
    fieldErrors?: Record<string, string[]>;
  };
}

export async function createAlertAction(
  rawInput: unknown
): Promise<ActionResult<{ alertId: string }>> {
  try {
    // 1. Validate external input with Zod
    const parsed = createAlertInputSchema.safeParse(rawInput);
    if (!parsed.success) {
      const fieldErrors: Record<string, string[]> = {};
      parsed.error.issues.forEach((issue) => {
        const field = issue.path.join(".") || "general";
        if (!fieldErrors[field]) fieldErrors[field] = [];
        fieldErrors[field].push(issue.message);
      });
      return {
        success: false,
        error: {
          category: "VALIDATION_ERROR",
          message: "Invalid alert submission data",
          fieldErrors,
        },
      };
    }

    // 2. Retrieve authenticated session
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new AuthenticationError("You must be logged in to issue alerts");
    }

    const sessionUser: SessionUser = {
      id: user.id,
      email: user.email ?? "unknown@system.local",
      role: ((user.user_metadata?.role as UserRole) || "AUTHORITY"),
      fullName: (user.user_metadata?.full_name as string) ?? null,
      department: (user.user_metadata?.department as string) ?? null,
    };

    // 3. Execute mutation
    const alert = await executeCreateAlert(parsed.data as CreateAlertInput, sessionUser);

    return {
      success: true,
      data: { alertId: alert.id },
    };
  } catch (err) {
    if (err instanceof AppError) {
      return {
        success: false,
        error: {
          category: err.category,
          message: err.message,
          fieldErrors: err.fieldErrors,
        },
      };
    }

    logger.error("Unhandled error in createAlertAction", { error: err });
    return {
      success: false,
      error: {
        category: "INTERNAL_ERROR",
        message: "An unexpected error occurred while issuing the alert",
      },
    };
  }
}
