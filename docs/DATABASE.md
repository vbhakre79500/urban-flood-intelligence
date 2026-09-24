# Database Schema & Entity Relationships

## Entities & Schemas

### `profiles`
- Primary Key: `id` (UUID from Supabase `auth.users`)
- Attributes: `role` (CITIZEN, AUTHORITY, ADMIN), `full_name`, `email`, `phone`, `department`, timestamps.

### `zones`
- Primary Key: `id` (UUIDv7)
- Attributes: `code` (unique), `name`, `district`, `baseline_risk`, `elevation_meters`, `drainage_capacity_score`, `center_lat`, `center_lng`, `boundary_geojson`, `is_active`, timestamps.

### `predictions`
- Primary Key: `id` (UUIDv7)
- Foreign Key: `zone_id` -> `zones.id`
- Attributes: `risk_level`, `confidence_score`, `predicted_rainfall_mm`, `predicted_water_level_meters`, `forecast_window_start`, `forecast_window_end`, `data_freshness_minutes`, `risk_drivers` (JSONB), `model_version`, `is_degraded_mode`, timestamps.

### `alerts`
- Primary Key: `id` (UUIDv7)
- Foreign Keys: `zone_id` -> `zones.id`, `issued_by` -> `profiles.id`
- Attributes: `severity` (ADVISORY, WATCH, WARNING, EMERGENCY), `status` (DRAFT, ACTIVE, ACKNOWLEDGED, RESOLVED, EXPIRED), `title`, `description`, `action_guidelines` (JSONB), `issued_at`, `expires_at`, `resolved_at`, timestamps.

### `notifications`
- Primary Key: `id` (UUIDv7)
- Foreign Keys: `user_id` -> `profiles.id`, `alert_id` -> `alerts.id`
- Attributes: `channel` (IN_APP, EMAIL, SMS, PUSH), `status`, `title`, `message`, `sent_at`, `read_at`, timestamps.

### `data_sources`
- Primary Key: `id` (UUIDv7)
- Attributes: `name`, `type` (WEATHER_RADAR, RAIN_GAUGE, STREAM_SENSOR, TERRAIN_ELEVATION, HISTORICAL_EVENT), `status`, `last_sync_at`, `metadata`, timestamps.

### `audit_logs`
- Primary Key: `id` (UUIDv7)
- Foreign Key: `user_id` -> `profiles.id`
- Attributes: `action`, `entity_type`, `entity_id`, `changes` (JSONB), `ip_address`, `user_agent`, `created_at`.
