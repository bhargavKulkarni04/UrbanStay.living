-- ==============================================================================
-- 16_ADD_RENT_DUE_DAY_AND_INDEXES.SQL
-- Purpose: Adds rent_due_day to tenants and beds, ensures payment_mode exists in rent_ledgers,
--          and creates indexes for fast day-wise collection lookups.
-- ==============================================================================

-- 1. TENANTS TABLE: Explicit Salary Rent Due Day (1 to 31)
ALTER TABLE public.tenants
ADD COLUMN IF NOT EXISTS rent_due_day INT DEFAULT 5;

-- 2. BEDS TABLE: Bed-level configured rent cycle day
ALTER TABLE public.beds
ADD COLUMN IF NOT EXISTS rent_due_day INT DEFAULT 5;

-- 3. RENT LEDGERS: Ensure payment_mode and due_date indexes exist
ALTER TABLE public.rent_ledgers
ADD COLUMN IF NOT EXISTS payment_mode TEXT DEFAULT 'UPI';

CREATE INDEX IF NOT EXISTS idx_rent_ledgers_due_date ON public.rent_ledgers (due_date);
CREATE INDEX IF NOT EXISTS idx_rent_ledgers_status ON public.rent_ledgers (status);
CREATE INDEX IF NOT EXISTS idx_rent_ledgers_cycle ON public.rent_ledgers (property_id, billing_month);
