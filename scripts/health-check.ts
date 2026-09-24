import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config();

async function checkHealth(): Promise<void> {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const healthEndpoint = `${appUrl}/api/health`;

  console.log(`🏥 Performing operational health check on ${healthEndpoint}...`);

  try {
    const response = await fetch(healthEndpoint);
    if (!response.ok) {
      console.error(`❌ Health check failed with status: ${response.status} ${response.statusText}`);
      process.exit(1);
    }

    const data = await response.json();
    console.log("✅ Application is healthy:");
    console.log(JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("❌ Failed to reach health check endpoint:", error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

checkHealth();
