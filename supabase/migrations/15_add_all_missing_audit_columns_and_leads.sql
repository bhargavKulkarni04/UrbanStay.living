-- ==============================================================================
-- 15_ADD_ALL_MISSING_AUDIT_COLUMNS_AND_LEADS.SQL
-- Purpose: Complete idempotent synchronization for all 23 UrbanStay tables
-- Adds property_name, room_number, and tenant_name audit metadata snapshots
-- Creates leads table and performance indexes across multi-tenant keys
-- ==============================================================================

-- 1. LEADS TABLE (Website / Marketing Inquiries)
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    city TEXT DEFAULT 'Bengaluru',
    source TEXT DEFAULT 'Website',
    status TEXT DEFAULT 'New',
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PHYSICAL INVENTORY PILLAR
ALTER TABLE public.rooms
ADD COLUMN IF NOT EXISTS property_name TEXT DEFAULT '';

ALTER TABLE public.beds
ADD COLUMN IF NOT EXISTS property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
ADD COLUMN IF NOT EXISTS property_name TEXT DEFAULT '',
ADD COLUMN IF NOT EXISTS room_number TEXT;

-- 3. TENANTS & ONBOARDING PILLAR
ALTER TABLE public.tenants
ADD COLUMN IF NOT EXISTS property_name TEXT DEFAULT '',
ADD COLUMN IF NOT EXISTS room_number TEXT DEFAULT '',
ADD COLUMN IF NOT EXISTS bed_label TEXT DEFAULT '',
ADD COLUMN IF NOT EXISTS tenant_name TEXT,
ADD COLUMN IF NOT EXISTS refund_upi_id TEXT,
ADD COLUMN IF NOT EXISTS emergency_contact TEXT;

ALTER TABLE public.onboarding_requests
ADD COLUMN IF NOT EXISTS property_name TEXT DEFAULT '',
ADD COLUMN IF NOT EXISTS room_number TEXT DEFAULT '';

-- 4. 0% DIRECT UPI FINANCIAL LEDGER PILLAR
ALTER TABLE public.rent_ledgers
ADD COLUMN IF NOT EXISTS property_name TEXT DEFAULT '',
ADD COLUMN IF NOT EXISTS tenant_name TEXT DEFAULT '',
ADD COLUMN IF NOT EXISTS room_number TEXT DEFAULT '';

ALTER TABLE public.payment_approvals
ADD COLUMN IF NOT EXISTS property_name TEXT DEFAULT '',
ADD COLUMN IF NOT EXISTS tenant_name TEXT DEFAULT '',
ADD COLUMN IF NOT EXISTS room_number TEXT DEFAULT '';

ALTER TABLE public.rent_extensions
ADD COLUMN IF NOT EXISTS property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
ADD COLUMN IF NOT EXISTS property_name TEXT DEFAULT '',
ADD COLUMN IF NOT EXISTS tenant_name TEXT DEFAULT '',
ADD COLUMN IF NOT EXISTS room_number TEXT DEFAULT '';

ALTER TABLE public.warden_cash_collections
ADD COLUMN IF NOT EXISTS property_name TEXT DEFAULT '',
ADD COLUMN IF NOT EXISTS tenant_name TEXT DEFAULT '',
ADD COLUMN IF NOT EXISTS room_number TEXT DEFAULT '';

ALTER TABLE public.damage_deductions
ADD COLUMN IF NOT EXISTS property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
ADD COLUMN IF NOT EXISTS property_name TEXT DEFAULT '',
ADD COLUMN IF NOT EXISTS tenant_name TEXT DEFAULT '',
ADD COLUMN IF NOT EXISTS room_number TEXT DEFAULT '';

-- 5. OPERATIONS & HELPDESK PILLAR
ALTER TABLE public.maintenance_tickets
ADD COLUMN IF NOT EXISTS property_name TEXT DEFAULT '',
ADD COLUMN IF NOT EXISTS tenant_name TEXT DEFAULT '',
ADD COLUMN IF NOT EXISTS room_number TEXT DEFAULT '';

ALTER TABLE public.expenses
ADD COLUMN IF NOT EXISTS property_name TEXT DEFAULT '';

ALTER TABLE public.staff
ADD COLUMN IF NOT EXISTS property_name TEXT DEFAULT '';

ALTER TABLE public.property_team
ADD COLUMN IF NOT EXISTS property_name TEXT DEFAULT '';

ALTER TABLE public.food_menus
ADD COLUMN IF NOT EXISTS property_name TEXT DEFAULT '';

-- 6. TENANT LIVING & LIFE CYCLE PILLAR
ALTER TABLE public.move_out_notices
ADD COLUMN IF NOT EXISTS property_name TEXT DEFAULT '',
ADD COLUMN IF NOT EXISTS tenant_name TEXT DEFAULT '';

ALTER TABLE public.announcements
ADD COLUMN IF NOT EXISTS property_name TEXT DEFAULT '';

ALTER TABLE public.housekeeping_requests
ADD COLUMN IF NOT EXISTS property_name TEXT DEFAULT '',
ADD COLUMN IF NOT EXISTS room_number TEXT DEFAULT '',
ADD COLUMN IF NOT EXISTS tenant_name TEXT DEFAULT '';

-- 7. SETTINGS & B2B SAAS BILLING PILLAR
ALTER TABLE public.property_settings
ADD COLUMN IF NOT EXISTS property_name TEXT DEFAULT '';

ALTER TABLE public.saas_subscriptions
ADD COLUMN IF NOT EXISTS property_name TEXT DEFAULT '';

ALTER TABLE public.saas_invoices
ADD COLUMN IF NOT EXISTS property_name TEXT DEFAULT '';

-- 8. PERFORMANCE INDEXES FOR SUB-50MS QUERY LATENCY
CREATE INDEX IF NOT EXISTS idx_beds_property_id ON public.beds(property_id);
CREATE INDEX IF NOT EXISTS idx_tenants_property_id ON public.tenants(property_id);
CREATE INDEX IF NOT EXISTS idx_rent_ledgers_property_id ON public.rent_ledgers(property_id);
CREATE INDEX IF NOT EXISTS idx_payment_approvals_property_id ON public.payment_approvals(property_id);
CREATE INDEX IF NOT EXISTS idx_rent_extensions_property_id ON public.rent_extensions(property_id);
CREATE INDEX IF NOT EXISTS idx_warden_cash_property_id ON public.warden_cash_collections(property_id);
CREATE INDEX IF NOT EXISTS idx_maintenance_property_id ON public.maintenance_tickets(property_id);
CREATE INDEX IF NOT EXISTS idx_expenses_property_id ON public.expenses(property_id);
CREATE INDEX IF NOT EXISTS idx_staff_property_id ON public.staff(property_id);
CREATE INDEX IF NOT EXISTS idx_move_out_property_id ON public.move_out_notices(property_id);
CREATE INDEX IF NOT EXISTS idx_onboarding_property_id ON public.onboarding_requests(property_id);
