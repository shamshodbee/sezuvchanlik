/*
# Create setups table for PUBG Mobile sensitivity sharing hub

1. New Tables
- `setups` — stores community-submitted sensitivity codes and optional TDM tactics
  - `id` (uuid, primary key, auto-generated)
  - `device_name` (text, not null) — e.g. "iPhone 15 Pro", "POCO X3"
  - `sensitivity_code` (text, not null) — the in-game sensitivity code string
  - `gyro_mode` (text, not null) — one of: "Always On", "Scope On", "Off"
  - `author_name` (text, not null) — display name of the contributor
  - `tdm_tip` (text, nullable) — optional short TDM tactic / loadout tip
  - `likes` (integer, default 0) — like counter for community engagement
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `setups`.
- This is a no-auth (single-tenant) app: anyone can browse and share setups.
- All CRUD policies scoped to `anon, authenticated` since data is intentionally public.

3. Indexes
- Index on `device_name` for fast search filtering.
- Index on `created_at` descending for newest-first ordering.
*/

CREATE TABLE IF NOT EXISTS setups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  device_name text NOT NULL,
  sensitivity_code text NOT NULL,
  gyro_mode text NOT NULL CHECK (gyro_mode IN ('Always On', 'Scope On', 'Off')),
  author_name text NOT NULL,
  tdm_tip text,
  likes integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_setups_device_name ON setups (device_name);
CREATE INDEX IF NOT EXISTS idx_setups_created_at ON setups (created_at DESC);

ALTER TABLE setups ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_setups" ON setups;
CREATE POLICY "anon_select_setups" ON setups FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_setups" ON setups;
CREATE POLICY "anon_insert_setups" ON setups FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_setups" ON setups;
CREATE POLICY "anon_update_setups" ON setups FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_setups" ON setups;
CREATE POLICY "anon_delete_setups" ON setups FOR DELETE
  TO anon, authenticated USING (true);
