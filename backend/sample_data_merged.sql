-- Sample data for StaffFlow with merged User/Staff table
-- Run this AFTER running the merge_staff_user.sql migration

-- Insert sample vendors
INSERT INTO `vendor` (`name`, `location`, `contact`, `status`, `created_at`, `updated_at`) VALUES
('Sultan Dines Restaurant', 'Downtown District, Kuala Lumpur', '+60 3-1234 5678', 'active', UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
('Marriott Convention Center', 'Business Park, Petaling Jaya', '+60 3-2345 6789', 'active', UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
('Hilton Garden Inn', 'Airport Area, Sepang', '+60 3-3456 7890', 'active', UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
('Grand Hyatt Hotel', 'KLCC, Kuala Lumpur', '+60 3-4567 8901', 'active', UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
('Sunway Resort Hotel', 'Bandar Sunway, Selangor', '+60 3-5678 9012', 'active', UNIX_TIMESTAMP(), UNIX_TIMESTAMP());

-- Insert admin user
INSERT INTO `user` (`username`, `auth_key`, `password_hash`, `email`, `phone`, `role`, `status`, `created_at`, `updated_at`) 
VALUES ('admin', 'admin-key', '$2y$13$EjaPFBnZOQsHdGuHI.xvhuDp1fHpo8hKRSk6yshqa9c5EG8s3C3lO', 'admin@staffflow.com', '+60 12-000 0000', 'admin', 10, UNIX_TIMESTAMP(), UNIX_TIMESTAMP())
ON DUPLICATE KEY UPDATE updated_at = UNIX_TIMESTAMP();

-- Insert staff users (password for all: "password123")
INSERT INTO `user` (`username`, `auth_key`, `password_hash`, `email`, `phone`, `max_hours_per_week`, `current_hours`, `staff_status`, `role`, `status`, `created_at`, `updated_at`) VALUES
('ahmad_abdullah', MD5(CONCAT('ahmad_abdullah', UNIX_TIMESTAMP())), '$2y$13$EjaPFBnZOQsHdGuHI.xvhuDp1fHpo8hKRSk6yshqa9c5EG8s3C3lO', 'ahmad@staffflow.com', '+60 12-345 6789', 40, 0, 'available', 'staff', 10, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
('siti_nurhaliza', MD5(CONCAT('siti_nurhaliza', UNIX_TIMESTAMP())), '$2y$13$EjaPFBnZOQsHdGuHI.xvhuDp1fHpo8hKRSk6yshqa9c5EG8s3C3lO', 'siti@staffflow.com', '+60 12-456 7890', 35, 0, 'available', 'staff', 10, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
('lee_wei_ming', MD5(CONCAT('lee_wei_ming', UNIX_TIMESTAMP())), '$2y$13$EjaPFBnZOQsHdGuHI.xvhuDp1fHpo8hKRSk6yshqa9c5EG8s3C3lO', 'lee@staffflow.com', '+60 12-567 8901', 40, 0, 'available', 'staff', 10, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
('priya_devi', MD5(CONCAT('priya_devi', UNIX_TIMESTAMP())), '$2y$13$EjaPFBnZOQsHdGuHI.xvhuDp1fHpo8hKRSk6yshqa9c5EG8s3C3lO', 'priya@staffflow.com', '+60 12-678 9012', 30, 0, 'available', 'staff', 10, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
('muhammad_faiz', MD5(CONCAT('muhammad_faiz', UNIX_TIMESTAMP())), '$2y$13$EjaPFBnZOQsHdGuHI.xvhuDp1fHpo8hKRSk6yshqa9c5EG8s3C3lO', 'faiz@staffflow.com', '+60 12-789 0123', 40, 0, 'available', 'staff', 10, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
('tan_mei_ling', MD5(CONCAT('tan_mei_ling', UNIX_TIMESTAMP())), '$2y$13$EjaPFBnZOQsHdGuHI.xvhuDp1fHpo8hKRSk6yshqa9c5EG8s3C3lO', 'tan@staffflow.com', '+60 12-890 1234', 35, 0, 'available', 'staff', 10, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
('kumar_raj', MD5(CONCAT('kumar_raj', UNIX_TIMESTAMP())), '$2y$13$EjaPFBnZOQsHdGuHI.xvhuDp1fHpo8hKRSk6yshqa9c5EG8s3C3lO', 'kumar@staffflow.com', '+60 12-901 2345', 40, 0, 'available', 'staff', 10, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
('nurul_aina', MD5(CONCAT('nurul_aina', UNIX_TIMESTAMP())), '$2y$13$EjaPFBnZOQsHdGuHI.xvhuDp1fHpo8hKRSk6yshqa9c5EG8s3C3lO', 'nurul@staffflow.com', '+60 12-012 3456', 30, 0, 'available', 'staff', 10, UNIX_TIMESTAMP(), UNIX_TIMESTAMP());

-- Insert staff skills (using user_id)
INSERT INTO `staff_skill` (`user_id`, `skill_name`, `created_at`, `updated_at`)
SELECT u.id, s.skill_name, UNIX_TIMESTAMP(), UNIX_TIMESTAMP()
FROM `user` u
CROSS JOIN (
    SELECT 'Waiter' as skill_name UNION ALL
    SELECT 'Bartender' UNION ALL
    SELECT 'Chef' UNION ALL
    SELECT 'Kitchen Staff' UNION ALL
    SELECT 'Security' UNION ALL
    SELECT 'Event Staff' UNION ALL
    SELECT 'Receptionist' UNION ALL
    SELECT 'Housekeeping'
) s
WHERE u.role = 'staff'
AND (
    (u.username = 'ahmad_abdullah' AND s.skill_name IN ('Waiter', 'Bartender'))
    OR (u.username = 'siti_nurhaliza' AND s.skill_name IN ('Chef', 'Kitchen Staff'))
    OR (u.username = 'lee_wei_ming' AND s.skill_name = 'Security')
    OR (u.username = 'priya_devi' AND s.skill_name IN ('Event Staff', 'Receptionist'))
    OR (u.username = 'muhammad_faiz' AND s.skill_name IN ('Kitchen Staff', 'Waiter'))
    OR (u.username = 'tan_mei_ling' AND s.skill_name = 'Housekeeping')
    OR (u.username = 'kumar_raj' AND s.skill_name IN ('Waiter', 'Event Staff'))
    OR (u.username = 'nurul_aina' AND s.skill_name = 'Receptionist')
);

-- Insert staff availability (next 7 days for all staff)
INSERT INTO `staff_availability` (`user_id`, `available_date`, `created_at`, `updated_at`)
SELECT 
    u.id,
    DATE_ADD(CURDATE(), INTERVAL d.day DAY),
    UNIX_TIMESTAMP(),
    UNIX_TIMESTAMP()
FROM 
    `user` u
CROSS JOIN 
    (SELECT 0 AS day UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6) d
WHERE 
    u.role IN ('staff', 'manager')
    AND u.staff_status = 'available';

-- Insert sample assignments for today (using user_id)
INSERT INTO `assignment` (`vendor_id`, `user_id`, `date`, `start_time`, `end_time`, `role`, `status`, `created_at`, `updated_at`)
SELECT 
    v.id,
    u.id,
    CURDATE(),
    '08:00:00',
    '16:00:00',
    COALESCE(
        (SELECT skill_name FROM staff_skill WHERE user_id = u.id LIMIT 1),
        'Server'
    ),
    'scheduled',
    UNIX_TIMESTAMP(),
    UNIX_TIMESTAMP()
FROM vendor v
CROSS JOIN user u
WHERE v.id <= 3
AND u.role = 'staff'
AND u.id IN (
    SELECT id FROM user WHERE role = 'staff' ORDER BY id LIMIT 3
)
LIMIT 3;

-- Insert sample assignments for tomorrow
INSERT INTO `assignment` (`vendor_id`, `user_id`, `date`, `start_time`, `end_time`, `role`, `status`, `created_at`, `updated_at`)
SELECT 
    v.id,
    u.id,
    DATE_ADD(CURDATE(), INTERVAL 1 DAY),
    '09:00:00',
    '17:00:00',
    COALESCE(
        (SELECT skill_name FROM staff_skill WHERE user_id = u.id LIMIT 1),
        'Server'
    ),
    'scheduled',
    UNIX_TIMESTAMP(),
    UNIX_TIMESTAMP()
FROM vendor v
CROSS JOIN user u
WHERE v.id > 3
AND u.role = 'staff'
AND u.id IN (
    SELECT id FROM user WHERE role = 'staff' ORDER BY id DESC LIMIT 2
)
LIMIT 2;
