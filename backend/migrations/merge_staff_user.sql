-- Migration to merge staff table with user table
-- This makes every staff member also a user who can log in

-- Step 1: Add staff-related fields to user table
ALTER TABLE `user` 
ADD COLUMN `phone` varchar(20) DEFAULT NULL AFTER `email`,
ADD COLUMN `max_hours_per_week` int(11) DEFAULT 40 AFTER `phone`,
ADD COLUMN `current_hours` decimal(5,2) DEFAULT 0.00 AFTER `max_hours_per_week`,
ADD COLUMN `staff_status` enum('available','unavailable','on_leave') DEFAULT 'available' AFTER `current_hours`,
ADD COLUMN `role` enum('admin','staff','manager') DEFAULT 'staff' AFTER `staff_status`;

-- Step 2: Migrate existing staff data to user table (if staff table exists and has data)
-- This will create user accounts for existing staff members
-- Default password for all migrated staff: "password123" (hash below)
INSERT INTO `user` (`username`, `auth_key`, `password_hash`, `email`, `phone`, `max_hours_per_week`, `current_hours`, `staff_status`, `role`, `status`, `created_at`, `updated_at`)
SELECT 
    LOWER(REPLACE(s.name, ' ', '_')) as username,
    MD5(CONCAT(s.name, UNIX_TIMESTAMP())) as auth_key,
    '$2y$13$EjaPFBnZOQsHdGuHI.xvhuDp1fHpo8hKRSk6yshqa9c5EG8s3C3lO' as password_hash,
    CONCAT(LOWER(REPLACE(s.name, ' ', '_')), '@staffflow.com') as email,
    s.phone,
    s.max_hours_per_week,
    s.current_hours,
    s.status as staff_status,
    'staff' as role,
    10 as status,
    s.created_at,
    s.updated_at
FROM `staff` s
WHERE NOT EXISTS (
    SELECT 1 FROM `user` u WHERE u.phone = s.phone
);

-- Step 3: Update staff_skill table to reference user table instead
ALTER TABLE `staff_skill` 
DROP FOREIGN KEY `staff_skill_ibfk_1`;

ALTER TABLE `staff_skill` 
CHANGE COLUMN `staff_id` `user_id` int(11) NOT NULL;

ALTER TABLE `staff_skill` 
ADD CONSTRAINT `staff_skill_ibfk_1` 
FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE;

-- Step 4: Update staff_availability table to reference user table
ALTER TABLE `staff_availability` 
DROP FOREIGN KEY `staff_availability_ibfk_1`;

ALTER TABLE `staff_availability` 
CHANGE COLUMN `staff_id` `user_id` int(11) NOT NULL;

ALTER TABLE `staff_availability` 
ADD CONSTRAINT `staff_availability_ibfk_1` 
FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE;

-- Step 5: Update assignment table to reference user table
ALTER TABLE `assignment` 
DROP FOREIGN KEY `assignment_ibfk_2`;

ALTER TABLE `assignment` 
CHANGE COLUMN `staff_id` `user_id` int(11) NOT NULL;

ALTER TABLE `assignment` 
ADD CONSTRAINT `assignment_ibfk_2` 
FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE;

-- Step 6: Drop the old staff table (optional - uncomment if you want to remove it)
-- DROP TABLE IF EXISTS `staff`;

-- Step 7: Create admin user if not exists
INSERT INTO `user` (`username`, `auth_key`, `password_hash`, `email`, `phone`, `role`, `status`, `created_at`, `updated_at`) 
SELECT 'admin', 'admin-key', '$2y$13$EjaPFBnZOQsHdGuHI.xvhuDp1fHpo8hKRSk6yshqa9c5EG8s3C3lO', 'admin@staffflow.com', '+60 12-000 0000', 'admin', 10, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()
WHERE NOT EXISTS (SELECT 1 FROM `user` WHERE `username` = 'admin');

-- Note: All migrated staff members will have password: "password123"
-- Admin user password: "password"
