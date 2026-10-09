-- ==============================================================================
-- 10_CREATE_SAAS_INVOICES_TABLE.SQL
-- Purpose: B2B SaaS Licensing Past Payment Receipts & Tax Invoices
-- ==============================================================================

CREATE TABLE IF NOT EXISTS saas_invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_number TEXT NOT NULL UNIQUE,          -- e.g. 'US-2026-0891'
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    amount NUMERIC(10, 2) NOT NULL,               -- e.g. 11.00 or 604.00
    status TEXT NOT NULL DEFAULT 'paid',          -- 'paid'
    payment_mode TEXT DEFAULT 'UPI AutoPay',      -- 'UPI AutoPay', 'Cashfree PG'
    utr_number TEXT,                              -- Cashfree UTR / payment ID
    billing_period TEXT,                          -- '1 Aug 2026 – 31 Aug 2026'
    created_at TIMESTAMPTZ DEFAULT NOW()
);
