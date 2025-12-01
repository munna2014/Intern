# StaffFlow Database Setup Guide

## Quick Setup

### 1. Start Docker Containers
```bash
docker-compose up -d
```

### 2. Access phpMyAdmin
Open your browser and go to: `http://localhost:8081`
- Username: `root`
- Password: `root`

### 3. Create Database Tables

The database `staffflow` should already exist. Now create the tables:

#### Users Table (for authentication)
```sql
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `auth_key` varchar(32) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `password_reset_token` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `status` smallint(6) NOT NULL DEFAULT 10,
  `created_at` int(11) NOT NULL,
  `updated_at` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

#### Vendor Table
```sql
CREATE TABLE `vendor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `location` varchar(255) NOT NULL,
  `contact` varchar(20) NOT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` int(11) NOT NULL,
  `updated_at` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

#### Staff Table
```sql
CREATE TABLE `staff` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `max_hours_per_week` int(11) DEFAULT 40,
  `current_hours` decimal(5,2) DEFAULT 0.00,
  `status` enum('available','unavailable','on_leave') DEFAULT 'available',
  `created_at` int(11) NOT NULL,
  `updated_at` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `staff_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

#### Staff Skills Table
```sql
CREATE TABLE `staff_skill` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `staff_id` int(11) NOT NULL,
  `skill_name` varchar(50) NOT NULL,
  `created_at` int(11) NOT NULL,
  `updated_at` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `staff_id` (`staff_id`),
  CONSTRAINT `staff_skill_ibfk_1` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

#### Staff Availability Table
```sql
CREATE TABLE `staff_availability` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `staff_id` int(11) NOT NULL,
  `available_date` date NOT NULL,
  `created_at` int(11) NOT NULL,
  `updated_at` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `staff_id` (`staff_id`),
  CONSTRAINT `staff_availability_ibfk_1` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

#### Assignment Table
```sql
CREATE TABLE `assignment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vendor_id` int(11) NOT NULL,
  `staff_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `role` varchar(50) NOT NULL,
  `status` enum('scheduled','checked-in','checked-out','cancelled') DEFAULT 'scheduled',
  `hours_worked` decimal(5,2) DEFAULT NULL,
  `check_in_time` datetime DEFAULT NULL,
  `check_out_time` datetime DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `updated_at` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `vendor_id` (`vendor_id`),
  KEY `staff_id` (`staff_id`),
  CONSTRAINT `assignment_ibfk_1` FOREIGN KEY (`vendor_id`) REFERENCES `vendor` (`id`) ON DELETE CASCADE,
  CONSTRAINT `assignment_ibfk_2` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

### 4. Insert Sample Data

Copy and paste the contents of `backend/sample_data.sql` into phpMyAdmin SQL tab and execute.

This will create:
- 5 sample vendors
- 8 sample staff members with skills
- Staff availability for the next 7 days
- Sample assignments for today and tomorrow

### 5. Create Admin User

```sql
INSERT INTO `user` (`username`, `auth_key`, `password_hash`, `email`, `status`, `created_at`, `updated_at`) 
VALUES ('admin', 'test-key', '$2y$13$EjaPFBnZOQsHdGuHI.xvhuDp1fHpo8hKRSk6yshqa9c5EG8s3C3lO', 'admin@staffflow.com', 10, UNIX_TIMESTAMP(), UNIX_TIMESTAMP());
```

**Login credentials:**
- Username: `admin`
- Password: `password`

## Testing the Application

### 1. Check Backend API
Open: `http://localhost:8080/vendors`

You should see JSON data with the vendors list.

### 2. Check Frontend
Open: `http://localhost:3000`

Login with:
- Username: `admin`
- Password: `password`

### 3. Test Features

1. **Dashboard**: View all vendors, staff, and assignments
2. **Generate Schedule**: Click "One-Click Schedule Generation" to auto-assign staff
3. **Check-in/Check-out**: Test the GPS time clock feature
4. **View Staff**: See all staff members with their skills and availability

## Hot Reload

After the initial setup, you won't need to restart Docker anymore:
- Frontend changes will auto-reload
- Backend PHP changes will reflect immediately
- Only restart if you modify `package.json` or `docker-compose.yml`

## Troubleshooting

### Backend not responding
```bash
docker-compose logs backend
```

### Frontend not loading
```bash
docker-compose logs frontend
```

### Database connection issues
Check that the database container is healthy:
```bash
docker-compose ps
```

### Reset everything
```bash
docker-compose down -v
docker-compose up -d
```
Then recreate the tables and insert sample data again.
