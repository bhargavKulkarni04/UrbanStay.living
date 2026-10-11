-- ==============================================================================
-- 12_CREATE_PROPERTY_TEAM_TABLE.SQL
-- Purpose: Co-Owners & PG Managers Team Management with Building Access
-- Source: mobile_app/lib/features/owner_dashboard/presentation/screens/owner_dashboard_screen.dart
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.property_team (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    property_name TEXT DEFAULT '',
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'manager',
    status TEXT NOT NULL DEFAULT 'Active',
    assigned_property_ids TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for rapid lookups
CREATE INDEX IF NOT EXISTS idx_property_team_property_id ON public.property_team(property_id);
CREATE INDEX IF NOT EXISTS idx_property_team_phone ON public.property_team(phone);
