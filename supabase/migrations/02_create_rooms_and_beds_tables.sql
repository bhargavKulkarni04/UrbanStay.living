-- ==============================================================================
-- 02_CREATE_ROOMS_AND_BEDS_TABLES.SQL
-- Purpose: Physical Rooms, Bed Inventories, Residents, and Damage Deductions
-- Source: owners/owner_KT/02_ROOMS_AND_BEDS_KT.md
-- ==============================================================================

-- 1. ROOMS TABLE
CREATE TABLE IF NOT EXISTS rooms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
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
    room_id UUID REFERENCES rooms(id) ON DELETE CASCADE,
    bed_label TEXT NOT NULL,
    is_occupied BOOLEAN NOT NULL DEFAULT FALSE,
    status TEXT NOT NULL DEFAULT 'Vacant',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TENANTS TABLE (Residents living in the PG)
CREATE TABLE IF NOT EXISTS tenants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    room_id UUID REFERENCES rooms(id) ON DELETE SET NULL,
    bed_id UUID REFERENCES beds(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    workplace TEXT,
    monthly_rent NUMERIC(10, 2) NOT NULL DEFAULT 8500.00,
    security_deposit NUMERIC(10, 2) NOT NULL DEFAULT 15000.00,
    is_aadhaar_verified BOOLEAN NOT NULL DEFAULT FALSE,
    status TEXT NOT NULL DEFAULT 'Active',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. DAMAGE DEDUCTIONS TABLE (Deposit Deductions before Checkout)
CREATE TABLE IF NOT EXISTS damage_deductions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    room_id UUID REFERENCES rooms(id) ON DELETE CASCADE,
    item_damaged TEXT NOT NULL,
    amount NUMERIC(10, 2) NOT NULL DEFAULT 500.00,
    deduction_mode TEXT NOT NULL DEFAULT 'deposit',
    photo_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
