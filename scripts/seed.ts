import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config();
import { runSeed } from "../src/db/seed";

async function main(): Promise<void> {
  try {
    await runSeed();
    console.log("✅ Seed completed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed execution failed:", error);
    process.exit(1);
  }
}

main();
