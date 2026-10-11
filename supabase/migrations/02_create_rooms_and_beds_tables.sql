-- ==============================================================================
-- 02_CREATE_ROOMS_AND_BEDS_TABLES.SQL
-- Purpose: Physical Rooms, Bed Inventories, Residents, and Damage Deductions
-- Source: owners/owner_KT/02_ROOMS_AND_BEDS_KT.md
-- ==============================================================================

-- 1. ROOMS TABLE
CREATE TABLE IF NOT EXISTS rooms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    property_name TEXT DEFAULT '',
    floor_number INT NOT NULL DEFAULT 1,
    floor_label TEXT NOT NULL DEFAULT '1st Floor',
    room_number TEXT NOT NULL,
    sharing_type TEXT NOT NULL DEFAULT '2-Sharing',
    total_beds INT NOT NULL DEFAULT 2,
    rent_per_bed NUMERIC(10, 2) NOT NULL DEFAULT 8500.00,
    deposit_per_bed NUMERIC(10, 2) NOT NULL DEFAULT 15000.00,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. BEDS TABLE (Inventory Tracking: Vacant, Active, Notice)
CREATE TABLE IF NOT EXISTS beds (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    property_name TEXT DEFAULT '',
    room_id UUID REFERENCES rooms(id) ON DELETE CASCADE,
    room_number TEXT,
    bed_label TEXT,
    bed_code TEXT,
    is_occupied BOOLEAN NOT NULL DEFAULT FALSE,
    status TEXT NOT NULL DEFAULT 'Vacant',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TENANTS TABLE (Residents living in the PG)
CREATE TABLE IF NOT EXISTS tenants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    property_name TEXT DEFAULT '',
    room_id UUID REFERENCES rooms(id) ON DELETE SET NULL,
    room_number TEXT,
    bed_id UUID REFERENCES beds(id) ON DELETE SET NULL,
    bed_label TEXT,
    name TEXT NOT NULL,
    tenant_name TEXT,
    phone TEXT NOT NULL,
    email TEXT,
    workplace TEXT,
    monthly_rent NUMERIC(10, 2) NOT NULL DEFAULT 8500.00,
    security_deposit NUMERIC(10, 2) NOT NULL DEFAULT 15000.00,
    is_aadhaar_verified BOOLEAN NOT NULL DEFAULT FALSE,
    refund_upi_id TEXT,
    emergency_contact TEXT,
    status TEXT NOT NULL DEFAULT 'Active',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. DAMAGE DEDUCTIONS TABLE (Deposit Deductions before Checkout)
CREATE TABLE IF NOT EXISTS damage_deductions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    property_name TEXT DEFAULT '',
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    tenant_name TEXT DEFAULT '',
    room_id UUID REFERENCES rooms(id) ON DELETE CASCADE,
    room_number TEXT DEFAULT '',
    item_damaged TEXT NOT NULL,
    amount NUMERIC(10, 2) NOT NULL DEFAULT 500.00,
    deduction_mode TEXT NOT NULL DEFAULT 'deposit',
    photo_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
