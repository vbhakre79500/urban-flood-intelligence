import { NextResponse, type NextRequest } from "next/server";
import { createAlertInputSchema } from "@/schemas/alerts";
import { fetchActiveAlerts } from "@/server/queries/alert.queries";
import { AppError } from "@/lib/errors";
import { logger } from "@/lib/logging/logger";

import type { AlertRecord } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    let activeAlerts: AlertRecord[] = [];
    try {
      activeAlerts = await fetchActiveAlerts();
    } catch {
      activeAlerts = [];
    }

    return NextResponse.json({
      success: true,
      data: activeAlerts,
    });
  } catch (error) {
    logger.error("API /api/alerts failure", { error });
    if (error instanceof AppError) {
      return NextResponse.json(error.toJSON(), { status: error.statusCode });
    }
    return NextResponse.json({ success: false, error: "Failed to retrieve alerts" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.json();
    const parsed = createAlertInputSchema.safeParse(rawBody);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          fieldErrors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    // In a real request, authenticated session is derived from cookie headers
    return NextResponse.json({
      success: true,
      message: "Alert creation validated successfully",
      validatedPayload: parsed.data,
    });
  } catch (error) {
    logger.error("API POST /api/alerts failure", { error });
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
