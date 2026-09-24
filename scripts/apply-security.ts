import dotenv from "dotenv";
import postgres from "postgres";
import fs from "fs";
import path from "path";

dotenv.config({ path: ".env.local" });
dotenv.config();

const connectionString = process.env.DIRECT_DATABASE_URL || process.env.DATABASE_URL;

if (!connectionString) {
  console.error("❌ DIRECT_DATABASE_URL or DATABASE_URL must be set");
  process.exit(1);
}

const sql = postgres(connectionString, {
  prepare: false,
});

async function run() {
  console.log("🔒 Starting PostgreSQL Security Layer Deployment...");

  // 1. Read the migration SQL file
  const migrationPath = path.join(process.cwd(), "src", "db", "migrations", "0001_production_rls_security.sql");
  const migrationSql = fs.readFileSync(migrationPath, "utf-8");

  // Remove comments before safety check to avoid false positives in comment descriptions
  const cleanSql = migrationSql.replace(/--.*$/gm, "").replace(/\/\*[\s\S]*?\*\//g, "");

  const destructivePatterns = [
    /\bDROP\s+TABLE\b/i,
    /\bDROP\s+COLUMN\b/i,
    /\bTRUNCATE\b/i,
    /\bFORCE\s+ROW\s+LEVEL\s+SECURITY\b/i,
  ];

  for (const pattern of destructivePatterns) {
    if (pattern.test(cleanSql)) {
      console.error(`❌ Prohibited destructive command detected matching ${pattern}`);
      process.exit(1);
    }
  }

  console.log("✅ Passed pre-execution safety check: 0 destructive commands detected.");

  // Check if any existing profiles rows have IDs not present in auth.users before adding FK
  const orphanProfiles = await sql`
    SELECT p.id, p.email
    FROM public.profiles p
    LEFT JOIN auth.users u ON p.id = u.id
    WHERE u.id IS NULL;
  `;
  if (orphanProfiles.length > 0) {
    console.warn(`⚠️ Warning: Found ${orphanProfiles.length} profiles without matching auth.users records:`, orphanProfiles);
  } else {
    console.log("✅ Verified: No orphan profiles exist. Foreign key constraint can be safely applied.");
  }

  // 2. Execute migration
  console.log("🚀 Executing migration SQL...");
  await sql.unsafe(migrationSql);
  console.log("✅ Migration executed successfully.");

  // 3. Post-execution verification
  console.log("\n--- VERIFICATION REPORT ---");

  // 3a. Foreign Key Verification via pg_constraint
  const fkConstraints = await sql`
    SELECT
      c.conname AS constraint_name,
      c.conrelid::regclass::text AS source_table,
      a.attname AS source_column,
      c.confrelid::regclass::text AS target_table,
      af.attname AS target_column,
      c.confdeltype AS on_delete_action
    FROM pg_constraint c
    JOIN pg_attribute a ON a.attrelid = c.conrelid AND a.attnum = ANY(c.conkey)
    JOIN pg_attribute af ON af.attrelid = c.confrelid AND af.attnum = ANY(c.confkey)
    WHERE c.conname = 'fk_profiles_auth_users';
  `;

  console.log("Foreign Key Status:", fkConstraints);

  // 3b. Row Level Security & FORCE RLS check on all 7 tables
  const targetTables = [
    "profiles",
    "zones",
    "predictions",
    "alerts",
    "notifications",
    "data_sources",
    "audit_logs",
  ];

  const rlsStatus = await sql`
    SELECT
      relname AS table_name,
      relrowsecurity AS rls_enabled,
      relforcerowsecurity AS force_rls_enabled
    FROM pg_class
    WHERE relname = ANY(${targetTables})
      AND relnamespace = 'public'::regnamespace;
  `;

  console.log("\nRLS Status for Tables:");
  for (const row of rlsStatus) {
    console.log(
      ` - Table: ${row.table_name.padEnd(16)} | RLS Enabled: ${row.rls_enabled} | FORCE RLS: ${row.force_rls_enabled}`
    );
  }

  // 3c. List all applied policies
  const policies = await sql`
    SELECT
      tablename,
      policyname,
      permissive,
      roles,
      cmd,
      qual,
      with_check
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = ANY(${targetTables})
    ORDER BY tablename, policyname;
  `;

  console.log(`\nApplied Policies Count: ${policies.length}`);
  for (const pol of policies) {
    console.log(` - [${pol.tablename}] ${pol.policyname} (${pol.cmd})`);
  }

  // 3d. Check Helper Functions
  const functions = await sql`
    SELECT
      proname,
      prosecdef,
      proconfig
    FROM pg_proc
    JOIN pg_namespace n ON pg_proc.pronamespace = n.oid
    WHERE n.nspname = 'public'
      AND proname IN ('get_current_user_role', 'is_admin', 'is_authority_or_admin');
  `;

  console.log("\nSecurity Definer Functions:");
  for (const fn of functions) {
    console.log(` - ${fn.proname}: prosecdef=${fn.prosecdef}, proconfig=${JSON.stringify(fn.proconfig)}`);
  }

  await sql.end();
}

run().catch((err) => {
  console.error("❌ Migration failed:", err);
  process.exit(1);
});
