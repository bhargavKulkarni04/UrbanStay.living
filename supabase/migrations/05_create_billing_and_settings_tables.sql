-- ==============================================================================
-- 05_CREATE_BILLING_AND_SETTINGS_TABLES.SQL
-- Purpose: B2B SaaS Licensing, Property Rules, and QR Standee Onboarding Queue
-- Source: owners/owner_KT/05_BILLING_SETTINGS_REPORTS_KT.md
-- ==============================================================================

-- 1. SAAS SUBSCRIPTIONS TABLE (Owner's Software License to UrbanStay: ₹15/bed + ₹79 platform fee)
CREATE TABLE IF NOT EXISTS saas_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    total_beds INT NOT NULL DEFAULT 35,
    price_per_bed NUMERIC(10, 2) NOT NULL DEFAULT 15.00,
    platform_fee NUMERIC(10, 2) NOT NULL DEFAULT 79.00,
    total_due NUMERIC(10, 2) NOT NULL DEFAULT 604.00,
    sac_code TEXT NOT NULL DEFAULT '998315',
    status TEXT NOT NULL DEFAULT 'active',
    trial_ends_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '12 days'),
    next_billing_date TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '30 days'),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 1B. SAAS INVOICES TABLE (Past Payment Receipts & Tax Invoices)
CREATE TABLE IF NOT EXISTS saas_invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_number TEXT NOT NULL UNIQUE,          -- e.g. 'US-2026-0891'
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    amount NUMERIC(10, 2) NOT NULL,               -- e.g. 11.00 or 604.00
    status TEXT NOT NULL DEFAULT 'paid',          -- 'paid'
    payment_mode TEXT DEFAULT 'UPI AutoPay',
    utr_number TEXT,                              -- Cashfree UTR / payment ID
    billing_period TEXT,                          -- '1 Aug 2026 – 31 Aug 2026'
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PROPERTY SETTINGS & HOUSE RULES TABLE
CREATE TABLE IF NOT EXISTS property_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE UNIQUE,
    gate_closing_time TEXT DEFAULT '10:30 PM',
    visitor_allowed BOOLEAN DEFAULT FALSE,
    alcohol_smoking_allowed BOOLEAN DEFAULT FALSE,
    wifi_ssid TEXT DEFAULT 'UrbanStay_HighSpeed_5G',
    wifi_password TEXT DEFAULT 'StaySecure@2026',
    emergency_phone TEXT DEFAULT '+91 98450 12345',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. RECEPTION QR ONBOARDING REQUESTS QUEUE TABLE
CREATE TABLE IF NOT EXISTS onboarding_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    tenant_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    gender TEXT DEFAULT 'Male',
    occupation TEXT DEFAULT 'Professional',
    company TEXT,
    requested_room TEXT NOT NULL,
    requested_bed TEXT NOT NULL,
    sharing_type TEXT NOT NULL DEFAULT '2-Sharing',
    monthly_rent NUMERIC(10, 2) NOT NULL DEFAULT 8500.00,
    deposit_amount NUMERIC(10, 2) NOT NULL DEFAULT 17000.00,
    aadhaar_masked TEXT,
    aadhaar_front_url TEXT,
    selfie_url TEXT,
    status TEXT NOT NULL DEFAULT 'PENDING_APPROVAL',
    created_at TIMESTAMPTZ DEFAULT NOW()
);
