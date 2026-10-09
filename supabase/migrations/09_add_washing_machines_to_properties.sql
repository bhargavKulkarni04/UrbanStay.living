-- ==============================================================================
-- 09_add_washing_machines_to_properties.sql
-- UrbanStay Properties Migration: Add Working Washing Machines tracking
-- Matches Step 3 Owner Setup Wizard (Late Payment Penalty -> Working Washing Machines)
-- ==============================================================================

ALTER TABLE properties
ADD COLUMN IF NOT EXISTS has_washing_machine BOOLEAN DEFAULT TRUE,
ADD COLUMN IF NOT EXISTS working_washing_machines INT DEFAULT 2,
ADD COLUMN IF NOT EXISTS washing_machine_location TEXT DEFAULT 'Terrace';

-- Audit comment for future SQL analysts
COMMENT ON COLUMN properties.working_washing_machines IS 'Total operational washing machines available for residents';
COMMENT ON COLUMN properties.washing_machine_location IS 'Physical location of washing machines in building (e.g. Terrace, Ground Floor)';
