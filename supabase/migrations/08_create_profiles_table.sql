-- ==============================================================================
-- 08_CREATE_PROFILES_TABLE.SQL
-- Purpose: User Profiles linking Supabase Auth (auth.users) to Owner/Tenant Roles
-- ==============================================================================

CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    phone TEXT NOT NULL,
    full_name TEXT,
    role TEXT NOT NULL DEFAULT 'owner', -- 'owner' or 'tenant'
    created_at TIMESTAMPTZ DEFAULT NOW()
);
