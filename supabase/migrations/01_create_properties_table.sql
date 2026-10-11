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
    -- Physical Location & Structure
    property_structure TEXT DEFAULT 'Independent Building',
    street_address TEXT,
    area_locality TEXT,
    landmark TEXT,
    city TEXT NOT NULL DEFAULT 'Bengaluru',
    state TEXT DEFAULT 'Karnataka',
    pincode TEXT,
    maps_url TEXT,

    -- Infrastructure & Facilities
    lift_count TEXT DEFAULT 'None',
    power_backup TEXT DEFAULT 'None',
    total_beds INT NOT NULL DEFAULT 0,

    -- Rules & Operations
    rent_due_day TEXT DEFAULT '5th',
    grace_period TEXT DEFAULT '5 Days',
    late_fee NUMERIC NOT NULL DEFAULT 200.00,
    notice_period TEXT DEFAULT '30 Days',

    -- Owner KYC & Identity
    owner_legal_name TEXT,
    owner_email TEXT,
    owner_aadhaar_number TEXT,
    owner_permanent_address TEXT,
    owner_aadhaar_front_url TEXT,
    owner_aadhaar_back_url TEXT,
    bank_qr_url TEXT,

    -- Floor Configuration
    ground_floor_has_rooms BOOLEAN DEFAULT TRUE,
    total_floors INT DEFAULT 1,
    total_rooms INT DEFAULT 0,
    floor_wise_rooms JSONB,
    room_naming_format TEXT DEFAULT 'numeric',

    -- Banking & UPI Settlement
    bank_holder_name TEXT,
    bank_name TEXT,
    upi_vpa TEXT,
    crediting_phone TEXT,
    owner_id UUID,

    created_at TIMESTAMPTZ DEFAULT NOW()
);
