-- ============================================================================
-- Urban Flood Intelligence - Production PostgreSQL Security Layer
-- Migration: 0001_production_rls_security.sql
--
-- Safety Guarantees:
-- - NO destructive statements (NO DROP TABLE, NO DROP COLUMN, NO TRUNCATE).
-- - NO FORCE ROW LEVEL SECURITY (preserves backend Drizzle postgres connections).
-- - Enables standard Row Level Security (RLS) on all 7 application tables.
-- - Creates safe, non-recursive SECURITY DEFINER role resolution functions.
-- - Establishes profiles.id -> auth.users.id foreign key with ON DELETE CASCADE.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. FOREIGN KEY: profiles.id -> auth.users.id (ON DELETE CASCADE)
-- ----------------------------------------------------------------------------
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'fk_profiles_auth_users'
      AND conrelid = 'public.profiles'::regclass
  ) THEN
    ALTER TABLE public.profiles
      ADD CONSTRAINT fk_profiles_auth_users
      FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;
END $$;

-- ----------------------------------------------------------------------------
-- 2. SECURITY DEFINER ROLE RESOLUTION HELPERS (Non-recursive)
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS public.user_role
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid() LIMIT 1;
$$;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
  SELECT COALESCE(
    (SELECT role = 'ADMIN'::public.user_role FROM public.profiles WHERE id = auth.uid() LIMIT 1),
    false
  );
$$;

CREATE OR REPLACE FUNCTION public.is_authority_or_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
  SELECT COALESCE(
    (SELECT role IN ('AUTHORITY'::public.user_role, 'ADMIN'::public.user_role) FROM public.profiles WHERE id = auth.uid() LIMIT 1),
    false
  );
$$;

REVOKE EXECUTE ON FUNCTION public.get_current_user_role() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_current_user_role() TO authenticated;

REVOKE EXECUTE ON FUNCTION public.is_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;

REVOKE EXECUTE ON FUNCTION public.is_authority_or_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_authority_or_admin() TO authenticated;

-- ----------------------------------------------------------------------------
-- 3. ENABLE ROW LEVEL SECURITY ON ALL 7 TABLES (NEVER FORCE)
-- ----------------------------------------------------------------------------
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.zones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.data_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- ----------------------------------------------------------------------------
-- 4. RLS POLICIES: PROFILES
-- ----------------------------------------------------------------------------
-- CITIZEN: read own profile only
-- AUTHORITY: read own profile and permitted operational peers
-- ADMIN: full access
DROP POLICY IF EXISTS policy_profiles_select_own ON public.profiles;
CREATE POLICY policy_profiles_select_own
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

DROP POLICY IF EXISTS policy_profiles_select_authority_peers ON public.profiles;
CREATE POLICY policy_profiles_select_authority_peers
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (
    public.get_current_user_role() = 'AUTHORITY'::public.user_role
    AND role IN ('AUTHORITY'::public.user_role, 'ADMIN'::public.user_role)
  );

DROP POLICY IF EXISTS policy_profiles_select_admin ON public.profiles;
CREATE POLICY policy_profiles_select_admin
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- UPDATE:
-- CITIZEN: update own profile only, CANNOT change role
-- AUTHORITY: update own profile only, CANNOT change role
-- ADMIN: full update access
DROP POLICY IF EXISTS policy_profiles_update_own ON public.profiles;
CREATE POLICY policy_profiles_update_own
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id
    AND (public.is_admin() OR role = public.get_current_user_role())
  );

DROP POLICY IF EXISTS policy_profiles_update_admin ON public.profiles;
CREATE POLICY policy_profiles_update_admin
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- INSERT:
-- Users can insert their own profile with role CITIZEN; ADMIN can insert any profile
DROP POLICY IF EXISTS policy_profiles_insert_own ON public.profiles;
CREATE POLICY policy_profiles_insert_own
  ON public.profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = id
    AND (role = 'CITIZEN'::public.user_role OR public.is_admin())
  );

DROP POLICY IF EXISTS policy_profiles_insert_admin ON public.profiles;
CREATE POLICY policy_profiles_insert_admin
  ON public.profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

-- DELETE:
-- ADMIN only
DROP POLICY IF EXISTS policy_profiles_delete_admin ON public.profiles;
CREATE POLICY policy_profiles_delete_admin
  ON public.profiles
  FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ----------------------------------------------------------------------------
-- 5. RLS POLICIES: ZONES
-- ----------------------------------------------------------------------------
-- CITIZEN: read active zones only
-- AUTHORITY: read zones and perform permitted operational updates
-- ADMIN: full access
DROP POLICY IF EXISTS policy_zones_select_active ON public.zones;
CREATE POLICY policy_zones_select_active
  ON public.zones
  FOR SELECT
  TO authenticated, anon
  USING (is_active = true);

DROP POLICY IF EXISTS policy_zones_select_authority_admin ON public.zones;
CREATE POLICY policy_zones_select_authority_admin
  ON public.zones
  FOR SELECT
  TO authenticated
  USING (public.is_authority_or_admin());

DROP POLICY IF EXISTS policy_zones_update_authority_admin ON public.zones;
CREATE POLICY policy_zones_update_authority_admin
  ON public.zones
  FOR UPDATE
  TO authenticated
  USING (public.is_authority_or_admin())
  WITH CHECK (public.is_authority_or_admin());

DROP POLICY IF EXISTS policy_zones_insert_admin ON public.zones;
CREATE POLICY policy_zones_insert_admin
  ON public.zones
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS policy_zones_delete_admin ON public.zones;
CREATE POLICY policy_zones_delete_admin
  ON public.zones
  FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ----------------------------------------------------------------------------
-- 6. RLS POLICIES: PREDICTIONS
-- ----------------------------------------------------------------------------
-- CITIZEN: read prediction data
-- AUTHORITY: read/write predictions
-- ADMIN: full access
DROP POLICY IF EXISTS policy_predictions_select_all ON public.predictions;
CREATE POLICY policy_predictions_select_all
  ON public.predictions
  FOR SELECT
  TO authenticated, anon
  USING (true);

DROP POLICY IF EXISTS policy_predictions_insert_authority_admin ON public.predictions;
CREATE POLICY policy_predictions_insert_authority_admin
  ON public.predictions
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_authority_or_admin());

DROP POLICY IF EXISTS policy_predictions_update_authority_admin ON public.predictions;
CREATE POLICY policy_predictions_update_authority_admin
  ON public.predictions
  FOR UPDATE
  TO authenticated
  USING (public.is_authority_or_admin())
  WITH CHECK (public.is_authority_or_admin());

DROP POLICY IF EXISTS policy_predictions_delete_authority_admin ON public.predictions;
CREATE POLICY policy_predictions_delete_authority_admin
  ON public.predictions
  FOR DELETE
  TO authenticated
  USING (public.is_authority_or_admin());

-- ----------------------------------------------------------------------------
-- 7. RLS POLICIES: ALERTS
-- ----------------------------------------------------------------------------
-- CITIZEN: read public/active alerts
-- AUTHORITY: read and create/update operational alerts
-- ADMIN: full access
DROP POLICY IF EXISTS policy_alerts_select_public ON public.alerts;
CREATE POLICY policy_alerts_select_public
  ON public.alerts
  FOR SELECT
  TO authenticated, anon
  USING (status IN ('ACTIVE'::public.alert_status, 'ACKNOWLEDGED'::public.alert_status, 'RESOLVED'::public.alert_status, 'EXPIRED'::public.alert_status));

DROP POLICY IF EXISTS policy_alerts_select_authority_admin ON public.alerts;
CREATE POLICY policy_alerts_select_authority_admin
  ON public.alerts
  FOR SELECT
  TO authenticated
  USING (public.is_authority_or_admin());

DROP POLICY IF EXISTS policy_alerts_insert_authority_admin ON public.alerts;
CREATE POLICY policy_alerts_insert_authority_admin
  ON public.alerts
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_authority_or_admin());

DROP POLICY IF EXISTS policy_alerts_update_authority_admin ON public.alerts;
CREATE POLICY policy_alerts_update_authority_admin
  ON public.alerts
  FOR UPDATE
  TO authenticated
  USING (public.is_authority_or_admin())
  WITH CHECK (public.is_authority_or_admin());

DROP POLICY IF EXISTS policy_alerts_delete_admin ON public.alerts;
CREATE POLICY policy_alerts_delete_admin
  ON public.alerts
  FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ----------------------------------------------------------------------------
-- 8. RLS POLICIES: NOTIFICATIONS
-- ----------------------------------------------------------------------------
-- CITIZEN: read/update only their own notifications
-- AUTHORITY: permitted notification/dispatch writes
-- ADMIN: full access
DROP POLICY IF EXISTS policy_notifications_select_own ON public.notifications;
CREATE POLICY policy_notifications_select_own
  ON public.notifications
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS policy_notifications_select_admin ON public.notifications;
CREATE POLICY policy_notifications_select_admin
  ON public.notifications
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

DROP POLICY IF EXISTS policy_notifications_update_own ON public.notifications;
CREATE POLICY policy_notifications_update_own
  ON public.notifications
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS policy_notifications_update_admin ON public.notifications;
CREATE POLICY policy_notifications_update_admin
  ON public.notifications
  FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS policy_notifications_insert_authority_admin ON public.notifications;
CREATE POLICY policy_notifications_insert_authority_admin
  ON public.notifications
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_authority_or_admin());

DROP POLICY IF EXISTS policy_notifications_delete_admin ON public.notifications;
CREATE POLICY policy_notifications_delete_admin
  ON public.notifications
  FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ----------------------------------------------------------------------------
-- 9. RLS POLICIES: DATA_SOURCES
-- ----------------------------------------------------------------------------
-- CITIZEN: read-only access to appropriate public source-health information
-- AUTHORITY: read/write operational telemetry source data
-- ADMIN: full access
DROP POLICY IF EXISTS policy_data_sources_select_all ON public.data_sources;
CREATE POLICY policy_data_sources_select_all
  ON public.data_sources
  FOR SELECT
  TO authenticated, anon
  USING (true);

DROP POLICY IF EXISTS policy_data_sources_insert_authority_admin ON public.data_sources;
CREATE POLICY policy_data_sources_insert_authority_admin
  ON public.data_sources
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_authority_or_admin());

DROP POLICY IF EXISTS policy_data_sources_update_authority_admin ON public.data_sources;
CREATE POLICY policy_data_sources_update_authority_admin
  ON public.data_sources
  FOR UPDATE
  TO authenticated
  USING (public.is_authority_or_admin())
  WITH CHECK (public.is_authority_or_admin());

DROP POLICY IF EXISTS policy_data_sources_delete_admin ON public.data_sources;
CREATE POLICY policy_data_sources_delete_admin
  ON public.data_sources
  FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ----------------------------------------------------------------------------
-- 10. RLS POLICIES: AUDIT_LOGS
-- ----------------------------------------------------------------------------
-- CITIZEN: no access
-- AUTHORITY: insert-only. Must not read/update/delete audit records
-- ADMIN: read access
-- Audit records must not be updateable/deletable through normal application roles
DROP POLICY IF EXISTS policy_audit_logs_select_admin ON public.audit_logs;
CREATE POLICY policy_audit_logs_select_admin
  ON public.audit_logs
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

DROP POLICY IF EXISTS policy_audit_logs_insert_authority_admin ON public.audit_logs;
CREATE POLICY policy_audit_logs_insert_authority_admin
  ON public.audit_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_authority_or_admin());

-- Notice: NO UPDATE and NO DELETE policies exist on public.audit_logs.
-- Normal application roles cannot update or delete any audit records.
