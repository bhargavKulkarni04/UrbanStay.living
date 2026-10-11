-- ==============================================================================
-- 14_ADD_PROPERTY_TO_DAMAGE_DEDUCTIONS.SQL
-- Purpose: Add property_id and property_name to existing damage_deductions table
-- ==============================================================================

ALTER TABLE public.damage_deductions 
ADD COLUMN IF NOT EXISTS property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
ADD COLUMN IF NOT EXISTS property_name TEXT DEFAULT '',
ADD COLUMN IF NOT EXISTS tenant_name TEXT DEFAULT '',
ADD COLUMN IF NOT EXISTS room_number TEXT DEFAULT '';

CREATE INDEX IF NOT EXISTS idx_damage_deductions_property_id ON public.damage_deductions(property_id);
