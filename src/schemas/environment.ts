import { z } from "zod";

/**
 * Server and Client Environment Schema
 * Strict Zod validation for external boundary configuration.
 */
export const environmentSchema = z
  .object({
    // Client-accessible public variables
    NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
    NEXT_PUBLIC_SUPABASE_URL: z.string().url({
      message: "NEXT_PUBLIC_SUPABASE_URL must be a valid URL",
    }),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional(),
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string().optional(),
    NEXT_PUBLIC_MAP_PROVIDER_KEY: z.string().optional(),

    // Server-only variables (never exposed to client)
    SUPABASE_SERVICE_ROLE_KEY: z.string().min(1, {
      message: "SUPABASE_SERVICE_ROLE_KEY is required on server",
    }),
    DATABASE_URL: z.string().min(1, {
      message: "DATABASE_URL is required for database connection",
    }),
    DIRECT_DATABASE_URL: z.string().optional(),

    // Cloudflare R2 Storage (Server-only)
    R2_ACCOUNT_ID: z.string().optional(),
    R2_ACCESS_KEY_ID: z.string().optional(),
    R2_SECRET_ACCESS_KEY: z.string().optional(),
    R2_BUCKET_NAME: z.string().optional(),
    R2_PUBLIC_URL: z.string().url().optional(),

    // Node runtime environment
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  })
  .refine(
    (data) => Boolean(data.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || data.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    {
      message: "Either NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY is required",
      path: ["NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"],
    }
  );

export type Environment = z.infer<typeof environmentSchema>;

/**
 * Validate and retrieve environment variables safely.
 * Throws actionable errors if required configurations are missing.
 */
export function getEnvironment(): Environment {
  const envResult = environmentSchema.safeParse(process.env);

  if (!envResult.success) {
    const errorDetails = envResult.error.format();
    console.error("❌ Environment configuration validation failed:", JSON.stringify(errorDetails, null, 2));
    throw new Error(
      `Invalid environment configuration: ${envResult.error.issues
        .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
        .join("; ")}`
    );
  }

  return envResult.data;
}
