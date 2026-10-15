-- ==============================================================================
-- 18_ADD_BANK_AND_TARIFFS_TO_PROPERTIES.SQL
-- Purpose: Add Direct Bank Account & Sharing Tariffs to properties & property_settings tables
-- Matches: PropertyModel.dart & PropertySettingsModel.dart & owner_settings_screen.dart
-- ==============================================================================

-- 1. Direct Banking columns to properties
ALTER TABLE public.properties
ADD COLUMN IF NOT EXISTS bank_account_number TEXT,
ADD COLUMN IF NOT EXISTS ifsc_code TEXT;

-- 2. Standard 1, 2, 3, 4 Sharing Rents & Deposits to properties
ALTER TABLE public.properties
ADD COLUMN IF NOT EXISTS sharing_1_rent INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS sharing_1_deposit INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS sharing_2_rent INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS sharing_2_deposit INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS sharing_3_rent INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS sharing_3_deposit INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS sharing_4_rent INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS sharing_4_deposit INTEGER DEFAULT 0;

-- 3. Standard 1, 2, 3, 4 Sharing Rents & Deposits to property_settings
ALTER TABLE public.property_settings
ADD COLUMN IF NOT EXISTS bank_account_number TEXT,
ADD COLUMN IF NOT EXISTS ifsc_code TEXT,
ADD COLUMN IF NOT EXISTS allow_online_upi BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS sharing_1_rent INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS sharing_1_deposit INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS sharing_2_rent INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS sharing_2_deposit INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS sharing_3_rent INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS sharing_3_deposit INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS sharing_4_rent INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS sharing_4_deposit INTEGER DEFAULT 0;
