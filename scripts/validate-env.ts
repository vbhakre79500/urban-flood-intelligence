import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config();

import { environmentSchema } from "../src/schemas/environment";

function validate(): void {
  console.log("🔍 Validating environment variables against Zod schema...");
  const result = environmentSchema.safeParse(process.env);

  if (!result.success) {
    console.error("❌ Environment validation FAILED:");
    result.error.issues.forEach((issue) => {
      console.error(`  - [${issue.path.join(".") || "root"}]: ${issue.message}`);
    });
    process.exit(1);
  }

  console.log("✅ Environment configuration successfully validated.");
  console.log(`  - App URL: ${result.data.NEXT_PUBLIC_APP_URL}`);
  console.log(`  - Node Environment: ${result.data.NODE_ENV}`);
  console.log("  - Supabase URL configured: YES");
  console.log("  - Database connection URL configured: YES");
}

validate();
