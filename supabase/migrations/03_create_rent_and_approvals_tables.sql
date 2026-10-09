-- ==============================================================================
-- 03_CREATE_RENT_AND_APPROVALS_TABLES.SQL
-- Purpose: Rent Ledgers, 0% Direct UPI Approvals, Extensions & Cash Audit
-- Source: owners/owner_KT/03_RENT_APPROVALS_AND_COLLECTION_KT.md
-- ==============================================================================

-- 1. RENT LEDGER TABLE
CREATE TABLE IF NOT EXISTS rent_ledgers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    billing_month TEXT NOT NULL,
    rent_amount NUMERIC(10, 2) NOT NULL DEFAULT 8500.00,
    due_amount NUMERIC(10, 2) NOT NULL DEFAULT 8500.00,
    status TEXT NOT NULL DEFAULT 'PENDING',
    due_date TEXT NOT NULL DEFAULT '5th',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PAYMENT APPROVALS TABLE (0% Direct UPI UTR Verification)
CREATE TABLE IF NOT EXISTS payment_approvals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    ledger_id UUID REFERENCES rent_ledgers(id) ON DELETE SET NULL,
    amount NUMERIC(10, 2) NOT NULL,
    utr_number TEXT NOT NULL,
    payment_app TEXT DEFAULT 'Google Pay',
    proof_image_url TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    receipt_no TEXT,
    reject_reason TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. RENT EXTENSIONS TABLE (Salary Delayed to 10th / 15th)
CREATE TABLE IF NOT EXISTS rent_extensions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    ledger_id UUID REFERENCES rent_ledgers(id) ON DELETE CASCADE,
    requested_date TEXT NOT NULL,
    reason TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. WARDEN CASH COLLECTIONS AUDIT TABLE
CREATE TABLE IF NOT EXISTS warden_cash_collections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    warden_name TEXT NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    notes TEXT,
    is_deposited_to_owner BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
