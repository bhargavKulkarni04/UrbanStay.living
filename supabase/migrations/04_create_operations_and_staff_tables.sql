-- ==============================================================================
-- 04_CREATE_OPERATIONS_AND_STAFF_TABLES.SQL
-- Purpose: Maintenance Ticketing, Operating Expenses (OpEx), and Staff Payroll
-- Source: owners/owner_KT/04_COMPLAINTS_EXPENSES_STAFF_FOOD_KT.md
-- ==============================================================================

-- 1. MAINTENANCE & COMPLAINTS TABLE
CREATE TABLE IF NOT EXISTS maintenance_tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    category TEXT NOT NULL DEFAULT 'Other',
    issue TEXT NOT NULL,
    photo_url TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    assigned_staff TEXT,
    progress_note TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. OPERATING EXPENSES (OpEx) TABLE
CREATE TABLE IF NOT EXISTS expenses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'Maintenance',
    vendor TEXT,
    amount NUMERIC(10, 2) NOT NULL,
    payment_mode TEXT NOT NULL DEFAULT 'UPI',
    receipt_url TEXT,
    expense_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. STAFF DIRECTORY & PAYROLL TABLE
CREATE TABLE IF NOT EXISTS staff (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'warden',
    work_title TEXT,
    phone TEXT NOT NULL,
    monthly_salary NUMERIC(10, 2) NOT NULL DEFAULT 15000.00,
    salary_status TEXT NOT NULL DEFAULT 'pending',
    joined_date TEXT DEFAULT 'Jan 2026',
    created_at TIMESTAMPTZ DEFAULT NOW()
);
