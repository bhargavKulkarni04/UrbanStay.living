-- ==============================================================================
-- 06_CREATE_TENANT_LIVING_AND_NOTICES_TABLES.SQL
-- Purpose: 30-Day Move-Out Notices, Building Notice Board, and Housekeeping
-- Source: tenants/tenant_KT/01 to 04
-- ==============================================================================

-- 1. 30-DAY MOVE-OUT NOTICES TABLE
CREATE TABLE IF NOT EXISTS move_out_notices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    room_number TEXT NOT NULL,
    bed_identifier TEXT NOT NULL,
    vacate_date DATE NOT NULL,
    notice_days INT NOT NULL DEFAULT 30,
    reason TEXT NOT NULL,
    refund_upi_id TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. BUILDING NOTICE BOARD ANNOUNCEMENTS TABLE
CREATE TABLE IF NOT EXISTS announcements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'General',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. HOUSEKEEPING REQUESTS TABLE
CREATE TABLE IF NOT EXISTS housekeeping_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    room_id UUID REFERENCES rooms(id) ON DELETE CASCADE,
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    service_type TEXT NOT NULL DEFAULT 'Daily Sweep',
    preferred_slot TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'SCHEDULED',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. ENSURE TENANTS HAS REFUND UPI & EMAIL
ALTER TABLE tenants
ADD COLUMN IF NOT EXISTS email TEXT,
ADD COLUMN IF NOT EXISTS refund_upi_id TEXT,
ADD COLUMN IF NOT EXISTS emergency_contact TEXT;
