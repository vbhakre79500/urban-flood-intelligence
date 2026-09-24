import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const uptimeSeconds = process.uptime();

  return NextResponse.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: Math.floor(uptimeSeconds),
    version: "0.1.0",
    service: "urban-flood-intelligence-platform",
  });
}
