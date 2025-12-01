# StaffFlow - Quick Reference Card

## 🔐 Login Credentials

### Admin Account
```
URL: http://localhost:3000
Username: admin
Password: password
```

### Staff Accounts (after migration)
```
Username: ahmad_abdullah, siti_nurhaliza, lee_wei_ming, etc.
Password: password123
```

## 🌐 Service URLs

| Service | URL | Credentials |
|---------|-----|-------------|
| Frontend | http://localhost:3000 | admin/password |
| Backend API | http://localhost:8080 | Bearer token |
| phpMyAdmin | http://localhost:8081 | root/root |
| MySQL | localhost:3306 | root/root |

## 📁 Important Files

### Migration Files
- `backend/migrations/merge_staff_user.sql` - Database migration
- `backend/sample_data_merged.sql` - Sample data
- `MIGRATION_CHECKLIST.md` - Step-by-step checklist

### Documentation
- `MERGE_STAFF_USER_GUIDE.md` - Detailed guide
- `STAFF_USER_MERGE_SUMMARY.md` - Quick summary
- `API_DOCUMENTATION.md` - API reference
- `QUICKSTART.md` - Initial setup guide

### Configuration
- `docker-compose.yml` - Docker configuration
- `backend/api/config/main.php` - Backend config
- `frontend/src/services/api.js` - API service

## 🐳 Docker Commands

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs backend
docker-compose logs frontend

# Restart a service
docker-compose restart backend
docker-compose restart frontend

# Check status
docker-compose ps

# Full reset (WARNING: deletes data)
docker-compose down -v
docker-compose up -d
```

## 🗄️ Database Quick Commands

### In phpMyAdmin (http://localhost:8081)

**Check admin user:**
```sql
SELECT * FROM user WHERE username='admin';
```

**Check staff users:**
```sql
SELECT id, username, email, phone, role, staff_status FROM user WHERE role='staff';
```

**Check vendors:**
```sql
SELECT * FROM vendor;
```

**Check assignments:**
```sql
SELECT a.*, u.username as staff_name, v.name as vendor_name 
FROM assignment a 
JOIN user u ON a.user_id = u.id 
JOIN vendor v ON a.vendor_id = v.id;
```

**Create admin user:**
```sql
INSERT INTO `user` (`username`, `auth_key`, `password_hash`, `email`, `phone`, `role`, `status`, `created_at`, `updated_at`) 
VALUES ('admin', 'admin-key', '$2y$13$EjaPFBnZOQsHdGuHI.xvhuDp1fHpo8hKRSk6yshqa9c5EG8s3C3lO', 'admin@staffflow.com', '+60 12-000 0000', 'admin', 10, UNIX_TIMESTAMP(), UNIX_TIMESTAMP());
```

## 🔧 API Endpoints

### Authentication
```
POST /auth/login
Body: {"username": "admin", "password": "password"}
```

### Vendors
```
GET    /vendors          - List all vendors
GET    /vendors/{id}     - Get single vendor
POST   /vendors          - Create vendor
PUT    /vendors/{id}     - Update vendor
DELETE /vendors/{id}     - Delete vendor
```

### Staff (Users with role='staff')
```
GET    /staff            - List all staff
GET    /staff/{id}       - Get single staff
POST   /staff            - Create staff
PUT    /staff/{id}       - Update staff
DELETE /staff/{id}       - Delete staff
```

### Assignments
```
GET    /assignments                    - List all assignments
GET    /assignments/{id}               - Get single assignment
POST   /assignments                    - Create assignment
PUT    /assignments/{id}               - Update assignment
DELETE /assignments/{id}               - Delete assignment
POST   /assignments/generate           - Generate schedule
POST   /assignments/check-in?id={id}  - Check in
POST   /assignments/check-out?id={id} - Check out
```

## 🎨 User Roles

| Role | Description | Can Login | Permissions |
|------|-------------|-----------|-------------|
| admin | Administrator | ✅ Yes | Full access |
| manager | Manager | ✅ Yes | Manage staff & assignments |
| staff | Staff member | ✅ Yes | View own assignments |

## 📊 Database Schema (After Merge)

```
user (unified table)
├── id
├── username
├── password_hash
├── email
├── phone
├── max_hours_per_week
├── current_hours
├── staff_status (available/unavailable/on_leave)
├── role (admin/manager/staff)
└── status

vendor
├── id
├── name
├── location
├── contact
└── status

assignment
├── id
├── vendor_id → vendor.id
├── user_id → user.id
├── date
├── start_time
├── end_time
├── role
├── status
├── check_in_time
└── check_out_time

staff_skill
├── id
├── user_id → user.id
└── skill_name

staff_availability
├── id
├── user_id → user.id
└── available_date
```

## 🚀 Common Tasks

### Add a new staff member
1. Go to phpMyAdmin
2. Insert into `user` table with role='staff'
3. Add skills in `staff_skill` table
4. Add availability in `staff_availability` table

### Add a new vendor
1. Login as admin
2. Use API or phpMyAdmin
3. Insert into `vendor` table

### Generate schedule
1. Login as admin
2. Click "One-Click Schedule Generation"
3. Or POST to `/assignments/generate`

### Check-in staff
1. Find assignment in dashboard
2. Click "Check In" button
3. Or POST to `/assignments/check-in?id={id}`

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Can't login | Check user exists and status=10 |
| Staff list empty | Run sample_data_merged.sql |
| API returns 401 | Check Bearer token in request |
| Frontend won't load | Check `docker-compose logs frontend` |
| Backend errors | Check `docker-compose logs backend` |
| Database connection error | Restart backend: `docker-compose restart backend` |

## 📞 Quick Help

**Check if everything is running:**
```bash
docker-compose ps
```

**View recent logs:**
```bash
docker-compose logs --tail 50
```

**Restart everything:**
```bash
docker-compose restart
```

**Full reset (WARNING):**
```bash
docker-compose down -v
docker-compose up -d
# Then run migrations again
```

## ✨ Features

✅ Real-time dashboard  
✅ Vendor management  
✅ Staff management  
✅ Assignment scheduling  
✅ GPS time clock (check-in/check-out)  
✅ AI-powered schedule generation  
✅ Role-based access control  
✅ Hot-reload development  

---

**Need more help?** Check the detailed guides:
- `MIGRATION_CHECKLIST.md` - Step-by-step migration
- `MERGE_STAFF_USER_GUIDE.md` - Detailed guide
- `API_DOCUMENTATION.md` - Complete API docs
