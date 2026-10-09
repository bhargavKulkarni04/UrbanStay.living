-- ==============================================================================
-- 01_CREATE_PROPERTIES_TABLE.SQL
-- Purpose: Stores PG Buildings & Owner Bank UPI Details
-- Source: owners/owner_KT/01_OWNER_SETUP_KT.md
-- ==============================================================================

CREATE TABLE IF NOT EXISTS properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_name TEXT NOT NULL,
    property_code TEXT UNIQUE,
    gender_category TEXT NOT NULL DEFAULT 'Coliving',
    address TEXT NOT NULL,
    locality TEXT NOT NULL DEFAULT 'BTM Layout',
    city TEXT NOT NULL DEFAULT 'Bengaluru',
    pincode TEXT,
    total_beds INT NOT NULL DEFAULT 35,
    due_day TEXT NOT NULL DEFAULT '5th',
    grace_period TEXT NOT NULL DEFAULT '5 Days',
    late_fee NUMERIC(10, 2) NOT NULL DEFAULT 200.00,
    notice_period TEXT NOT NULL DEFAULT '30 Days',
    bank_holder_name TEXT,
    bank_name TEXT,
    owner_upi_id TEXT NOT NULL,
    owner_phone TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
