import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: [
      {
        id: "aud-001",
        action: "SYSTEM_INITIALIZED",
        entityType: "SYSTEM",
        entityId: "SYS-INIT",
        createdAt: new Date().toISOString(),
      },
    ],
  });
}
