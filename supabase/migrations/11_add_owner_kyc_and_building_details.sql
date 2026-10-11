-- ==============================================================================
-- 11_ADD_OWNER_KYC_AND_BUILDING_DETAILS.SQL
-- Purpose: Store Owner KYC (Aadhaar, Address, Email) & Property Floor Structure
-- ==============================================================================

ALTER TABLE properties
ADD COLUMN IF NOT EXISTS owner_legal_name TEXT,
ADD COLUMN IF NOT EXISTS owner_email TEXT,
ADD COLUMN IF NOT EXISTS owner_aadhaar_number TEXT,
ADD COLUMN IF NOT EXISTS owner_permanent_address TEXT,
ADD COLUMN IF NOT EXISTS owner_aadhaar_front_url TEXT,
ADD COLUMN IF NOT EXISTS owner_aadhaar_back_url TEXT,
ADD COLUMN IF NOT EXISTS bank_qr_url TEXT,
ADD COLUMN IF NOT EXISTS ground_floor_has_rooms BOOLEAN DEFAULT TRUE,
ADD COLUMN IF NOT EXISTS total_floors INT DEFAULT 1,
ADD COLUMN IF NOT EXISTS total_rooms INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS floor_wise_rooms JSONB,
ADD COLUMN IF NOT EXISTS room_naming_format TEXT DEFAULT 'numeric';
