-- Update foreign keys to reference user table

-- Update staff_skill table
ALTER TABLE `staff_skill` DROP FOREIGN KEY `fk-staff_skill-staff_id`;
ALTER TABLE `staff_skill` CHANGE COLUMN `staff_id` `user_id` int(11) NOT NULL;
ALTER TABLE `staff_skill` ADD CONSTRAINT `staff_skill_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE;

-- Update staff_availability table  
ALTER TABLE `staff_availability` DROP FOREIGN KEY `fk-staff_availability-staff_id`;
ALTER TABLE `staff_availability` CHANGE COLUMN `staff_id` `user_id` int(11) NOT NULL;
ALTER TABLE `staff_availability` ADD CONSTRAINT `staff_availability_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE;

-- Update assignment table
ALTER TABLE `assignment` DROP FOREIGN KEY `fk-assignment-staff_id`;
ALTER TABLE `assignment` CHANGE COLUMN `staff_id` `user_id` int(11) NOT NULL;
ALTER TABLE `assignment` ADD CONSTRAINT `assignment_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE;

-- Create admin user if not exists
INSERT INTO `user` (`username`, `auth_key`, `password_hash`, `email`, `phone`, `role`, `status`, `created_at`, `updated_at`) 
SELECT 'admin', 'admin-key', '$2y$13$EjaPFBnZOQsHdGuHI.xvhuDp1fHpo8hKRSk6yshqa9c5EG8s3C3lO', 'admin@staffflow.com', '+60 12-000 0000', 'admin', 10, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()
WHERE NOT EXISTS (SELECT 1 FROM (SELECT * FROM `user`) AS u WHERE u.`username` = 'admin');
