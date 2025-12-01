-- Sample data for StaffFlow database
-- Run this in phpMyAdmin or MySQL client to populate the database

-- Insert sample vendors
INSERT INTO `vendor` (`name`, `location`, `contact`, `status`, `created_at`, `updated_at`) VALUES
('Sultan Dines Restaurant', 'Downtown District, Kuala Lumpur', '+60 3-1234 5678', 'active', UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
('Marriott Convention Center', 'Business Park, Petaling Jaya', '+60 3-2345 6789', 'active', UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
('Hilton Garden Inn', 'Airport Area, Sepang', '+60 3-3456 7890', 'active', UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
('Grand Hyatt Hotel', 'KLCC, Kuala Lumpur', '+60 3-4567 8901', 'active', UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
('Sunway Resort Hotel', 'Bandar Sunway, Selangor', '+60 3-5678 9012', 'active', UNIX_TIMESTAMP(), UNIX_TIMESTAMP());

-- Insert sample staff
INSERT INTO `staff` (`name`, `phone`, `max_hours_per_week`, `current_hours`, `status`, `created_at`, `updated_at`) VALUES
('Ahmad bin Abdullah', '+60 12-345 6789', 40, 0, 'available', UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
('Siti Nurhaliza', '+60 12-456 7890', 35, 0, 'available', UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
('Lee Wei Ming', '+60 12-567 8901', 40, 0, 'available', UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
('Priya Devi', '+60 12-678 9012', 30, 0, 'available', UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
('Muhammad Faiz', '+60 12-789 0123', 40, 0, 'available', UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
('Tan Mei Ling', '+60 12-890 1234', 35, 0, 'available', UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
('Kumar Raj', '+60 12-901 2345', 40, 0, 'available', UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
('Nurul Aina', '+60 12-012 3456', 30, 0, 'available', UNIX_TIMESTAMP(), UNIX_TIMESTAMP());

-- Insert staff skills
INSERT INTO `staff_skill` (`staff_id`, `skill_name`, `created_at`, `updated_at`) VALUES
(1, 'Waiter', UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(1, 'Bartender', UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(2, 'Chef', UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(2, 'Kitchen Staff', UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(3, 'Security', UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(4, 'Event Staff', UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(4, 'Receptionist', UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(5, 'Kitchen Staff', UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(5, 'Waiter', UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(6, 'Housekeeping', UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(7, 'Waiter', UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(7, 'Event Staff', UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(8, 'Receptionist', UNIX_TIMESTAMP(), UNIX_TIMESTAMP());

-- Insert staff availability (next 7 days)
INSERT INTO `staff_availability` (`staff_id`, `available_date`, `created_at`, `updated_at`)
SELECT 
    s.id,
    DATE_ADD(CURDATE(), INTERVAL d.day DAY),
    UNIX_TIMESTAMP(),
    UNIX_TIMESTAMP()
FROM 
    `staff` s
CROSS JOIN 
    (SELECT 0 AS day UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6) d
WHERE 
    s.status = 'available';

-- Insert sample assignments for today
INSERT INTO `assignment` (`vendor_id`, `staff_id`, `date`, `start_time`, `end_time`, `role`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, CURDATE(), '08:00:00', '16:00:00', 'Waiter', 'scheduled', UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(1, 2, CURDATE(), '16:00:00', '23:00:00', 'Chef', 'scheduled', UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(2, 3, CURDATE(), '09:00:00', '17:00:00', 'Security', 'scheduled', UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(2, 4, CURDATE(), '10:00:00', '18:00:00', 'Event Staff', 'scheduled', UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(3, 5, CURDATE(), '06:00:00', '14:00:00', 'Kitchen Staff', 'scheduled', UNIX_TIMESTAMP(), UNIX_TIMESTAMP());

-- Insert sample assignments for tomorrow
INSERT INTO `assignment` (`vendor_id`, `staff_id`, `date`, `start_time`, `end_time`, `role`, `status`, `created_at`, `updated_at`) VALUES
(4, 6, DATE_ADD(CURDATE(), INTERVAL 1 DAY), '08:00:00', '16:00:00', 'Housekeeping', 'scheduled', UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(4, 7, DATE_ADD(CURDATE(), INTERVAL 1 DAY), '12:00:00', '20:00:00', 'Waiter', 'scheduled', UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(5, 8, DATE_ADD(CURDATE(), INTERVAL 1 DAY), '09:00:00', '17:00:00', 'Receptionist', 'scheduled', UNIX_TIMESTAMP(), UNIX_TIMESTAMP());
