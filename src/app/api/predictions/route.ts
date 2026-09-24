import { NextResponse, type NextRequest } from "next/server";
import { queryPredictionsSchema } from "@/schemas/predictions";
import { fetchLatestPredictions } from "@/server/queries/prediction.queries";
import { AppError } from "@/lib/errors";
import { logger } from "@/lib/logging/logger";
import type { PredictionRecord } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const searchParams = Object.fromEntries(request.nextUrl.searchParams.entries());
    const parseResult = queryPredictionsSchema.safeParse(searchParams);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid query parameters",
          details: parseResult.error.format(),
        },
        { status: 400 }
      );
    }

    let predictionsList: PredictionRecord[] = [];
    try {
      predictionsList = await fetchLatestPredictions();
    } catch {
      predictionsList = [];
    }

    return NextResponse.json({
      success: true,
      data: predictionsList,
    });
  } catch (error) {
    logger.error("API /api/predictions failure", { error });
    if (error instanceof AppError) {
      return NextResponse.json(error.toJSON(), { status: error.statusCode });
    }
    return NextResponse.json(
      { success: false, error: "Failed to retrieve predictions" },
      { status: 500 }
    );
  }
}
