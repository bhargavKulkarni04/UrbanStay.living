-- ==============================================================================
-- 17_ADD_ALL_OWNER_SETTINGS_COLUMNS.SQL
-- Purpose: Complete single-table schema for all Owner Settings in property_settings
-- Matches: PropertySettingsModel.dart & owner_settings_screen.dart
-- ==============================================================================

-- 1. Business & Tax Details
ALTER TABLE public.property_settings
ADD COLUMN IF NOT EXISTS legal_entity_name TEXT,
ADD COLUMN IF NOT EXISTS gst_number TEXT,
ADD COLUMN IF NOT EXISTS cin_number TEXT,
ADD COLUMN IF NOT EXISTS bbmp_license_number TEXT;

-- 2. Direct Bank Account Details (for NEFT / IMPS)
ALTER TABLE public.property_settings
ADD COLUMN IF NOT EXISTS bank_account_number TEXT,
ADD COLUMN IF NOT EXISTS ifsc_code TEXT;

-- 3. Stay & Lease Policies
ALTER TABLE public.property_settings
ADD COLUMN IF NOT EXISTS lockin_period TEXT DEFAULT '3 Months',
ADD COLUMN IF NOT EXISTS agreement_duration TEXT DEFAULT '11 Months',
ADD COLUMN IF NOT EXISTS receipt_terms TEXT;

-- 4. Dynamic Sharing Tariffs (1, 2, 3, 4 sharing rents & deposits)
ALTER TABLE public.property_settings
ADD COLUMN IF NOT EXISTS sharing_tariffs JSONB DEFAULT '[]'::jsonb;

-- 5. Curfew Timings
ALTER TABLE public.property_settings
ADD COLUMN IF NOT EXISTS morning_gate_open_time TEXT DEFAULT '05:30 AM';

-- 6. Payment Collection Mode Switch
ALTER TABLE public.property_settings
ADD COLUMN IF NOT EXISTS allow_online_upi BOOLEAN DEFAULT true;

-- 7. Rent & Dues Automation Switches
ALTER TABLE public.property_settings
ADD COLUMN IF NOT EXISTS daily_late_fine_enabled BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS accept_partial_payments BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS auto_send_whatsapp_receipts BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS auto_dues_reminders BOOLEAN DEFAULT true;

-- 8. Onboarding & KYC Automation Switches
ALTER TABLE public.property_settings
ADD COLUMN IF NOT EXISTS auto_welcome_whatsapp BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS auto_approve_bookings BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS send_deposit_reminders BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS lock_profile_after_movein BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS mandatory_tenant_kyc BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS require_complaint_photo BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS kyc_applicable_to TEXT DEFAULT 'All Residents',
ADD COLUMN IF NOT EXISTS stamp_business_name TEXT,
ADD COLUMN IF NOT EXISTS authorized_signatory TEXT;
