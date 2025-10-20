-- Step 1: Add new roles to the enum type
ALTER TYPE app_role ADD VALUE IF NOT EXISTS 'faculty';
ALTER TYPE app_role ADD VALUE IF NOT EXISTS 'hod';
ALTER TYPE app_role ADD VALUE IF NOT EXISTS 'class_coordinator';