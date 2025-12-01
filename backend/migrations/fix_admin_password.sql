-- Fix admin password to admin123
UPDATE `user` SET `password_hash` = '$2y$10$HhSaQ9ECGXdcypxhsrvBauJXC1rCJbrWzuSKnn2GV9n1uI7KFcKIa' WHERE `username` = 'admin';
