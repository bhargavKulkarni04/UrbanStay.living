-- ==============================================================================
-- 13_CREATE_FOOD_MENUS_TABLE.SQL
-- Purpose: Complete Weekly / Multi-Week Rotating Meal Menu per Property
-- Source: mobile_app/lib/features/owner_food_menu & tenant_food_menu
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.food_menus (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
    property_name TEXT DEFAULT '',
    cycle_weeks INT NOT NULL DEFAULT 4,          -- 1, 2, 3, or 4 week repeating cycle
    week_number INT NOT NULL DEFAULT 1,          -- Week 1, Week 2, Week 3, Week 4
    day_of_week TEXT NOT NULL,                  -- 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'
    breakfast TEXT DEFAULT '',
    lunch TEXT DEFAULT '',
    dinner TEXT DEFAULT '',
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    -- Enforces unique meal entry per property, per week number, and per day
    CONSTRAINT food_menus_property_week_day_unique UNIQUE (property_id, week_number, day_of_week)
);

-- Idempotent column additions for existing tables
ALTER TABLE public.food_menus 
ADD COLUMN IF NOT EXISTS cycle_weeks INT NOT NULL DEFAULT 4,
ADD COLUMN IF NOT EXISTS week_number INT NOT NULL DEFAULT 1;

-- Ensure constraint allows multi-week rotation per day
ALTER TABLE public.food_menus 
DROP CONSTRAINT IF EXISTS food_menus_property_id_day_of_week_key,
DROP CONSTRAINT IF EXISTS food_menus_property_day_unique,
DROP CONSTRAINT IF EXISTS food_menus_property_week_day_unique;

ALTER TABLE public.food_menus 
ADD CONSTRAINT food_menus_property_week_day_unique UNIQUE (property_id, week_number, day_of_week);

-- Indexes for rapid lookups
CREATE INDEX IF NOT EXISTS idx_food_menus_property_id ON public.food_menus(property_id);
CREATE INDEX IF NOT EXISTS idx_food_menus_prop_week ON public.food_menus(property_id, week_number);
