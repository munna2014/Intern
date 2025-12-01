# Staff-User Merge Migration Checklist

## ✅ Pre-Migration Checklist

- [ ] Docker containers are running (`docker-compose ps`)
- [ ] Can access phpMyAdmin at http://localhost:8081
- [ ] Can access frontend at http://localhost:3000
- [ ] Backend API is responding at http://localhost:8080

## 📋 Migration Steps

### Step 1: Backup (Recommended)
- [ ] Open phpMyAdmin (http://localhost:8081)
- [ ] Click on `staffflow` database
- [ ] Click "Export" tab
- [ ] Click "Go" to download backup
- [ ] Save the backup file somewhere safe

### Step 2: Run Migration SQL
- [ ] Open phpMyAdmin (http://localhost:8081)
- [ ] Click on `staffflow` database
- [ ] Click "SQL" tab
- [ ] Open file: `backend/migrations/merge_staff_user.sql`
- [ ] Copy ALL contents
- [ ] Paste into SQL tab in phpMyAdmin
- [ ] Click "Go" button
- [ ] Wait for "Query OK" message

**Expected Results:**
- User table now has new columns: phone, max_hours_per_week, current_hours, staff_status, role
- staff_skill table: staff_id renamed to user_id
- staff_availability table: staff_id renamed to user_id
- assignment table: staff_id renamed to user_id
- Admin user created

### Step 3: Insert Sample Data (Optional)
- [ ] Still in phpMyAdmin SQL tab
- [ ] Open file: `backend/sample_data_merged.sql`
- [ ] Copy ALL contents
- [ ] Paste into SQL tab
- [ ] Click "Go" button
- [ ] Wait for "Query OK" message

**Expected Results:**
- 5 vendors inserted
- 8 staff users inserted (with role='staff')
- Skills assigned to each staff member
- 7 days of availability for each staff
- Sample assignments created

### Step 4: Verify Database Changes
- [ ] In phpMyAdmin, click on `user` table
- [ ] Click "Structure" tab
- [ ] Verify new columns exist:
  - phone
  - max_hours_per_week
  - current_hours
  - staff_status
  - role

- [ ] Click "Browse" tab
- [ ] Verify you see:
  - 1 admin user (role='admin')
  - 8 staff users (role='staff')

- [ ] Click on `staff_skill` table
- [ ] Click "Structure" tab
- [ ] Verify column is named `user_id` (not staff_id)

- [ ] Click on `assignment` table
- [ ] Click "Structure" tab
- [ ] Verify column is named `user_id` (not staff_id)

### Step 5: Test the Application

#### Test Admin Login
- [ ] Open http://localhost:3000
- [ ] Login with:
  - Username: `admin`
  - Password: `password`
- [ ] Dashboard loads successfully
- [ ] Can see vendors list
- [ ] Can see staff list (should show 8 staff members)
- [ ] Can see assignments

#### Test Staff Data Display
- [ ] Staff cards show:
  - Name (username)
  - Phone number
  - Skills
  - Max hours per week
  - Current hours
  - Status (available/unavailable/on_leave)

#### Test Assignments
- [ ] Assignments show:
  - Vendor name
  - Staff name
  - Date and time
  - Role
  - Status
- [ ] Can check-in an assignment
- [ ] Can check-out an assignment

#### Test Schedule Generation
- [ ] Click "One-Click Schedule Generation"
- [ ] Schedule is generated successfully
- [ ] New assignments appear in the list

### Step 6: Test Staff Login (Optional)
- [ ] Logout from admin account
- [ ] Login with staff credentials:
  - Username: `ahmad_abdullah`
  - Password: `password123`
- [ ] Staff member can see their own dashboard
- [ ] Staff member can see their assignments

## 🎯 Success Criteria

✅ All database tables updated successfully  
✅ Admin can login  
✅ Dashboard shows vendors, staff, and assignments  
✅ Staff list displays correctly with all fields  
✅ Assignments can be created and managed  
✅ Check-in/check-out works  
✅ Schedule generation works  

## 🚨 Troubleshooting

### Error: "Column 'staff_id' doesn't exist"
**Solution:** The migration wasn't completed. Run `merge_staff_user.sql` again.

### Error: "Table 'user' doesn't have column 'phone'"
**Solution:** The migration wasn't completed. Run `merge_staff_user.sql` again.

### Staff list is empty
**Solution:** 
1. Check if users exist: `SELECT * FROM user WHERE role='staff'`
2. If empty, run `sample_data_merged.sql`

### Can't login with admin/password
**Solution:**
1. Check if admin exists: `SELECT * FROM user WHERE username='admin'`
2. If not, run this SQL:
```sql
INSERT INTO `user` (`username`, `auth_key`, `password_hash`, `email`, `phone`, `role`, `status`, `created_at`, `updated_at`) 
VALUES ('admin', 'admin-key', '$2y$13$EjaPFBnZOQsHdGuHI.xvhuDp1fHpo8hKRSk6yshqa9c5EG8s3C3lO', 'admin@staffflow.com', '+60 12-000 0000', 'admin', 10, UNIX_TIMESTAMP(), UNIX_TIMESTAMP());
```

### Backend errors in logs
**Solution:**
```bash
docker-compose restart backend
docker-compose logs backend --tail 50
```

### Need to rollback
**Solution:**
1. Stop containers: `docker-compose down`
2. Restore from backup in phpMyAdmin
3. Restart: `docker-compose up -d`

## 📞 Need Help?

Check these files for more information:
- `MERGE_STAFF_USER_GUIDE.md` - Detailed migration guide
- `STAFF_USER_MERGE_SUMMARY.md` - Quick summary
- `API_DOCUMENTATION.md` - API reference

## ✨ After Migration

You now have:
- ✅ Unified user management
- ✅ Staff members can log in
- ✅ Role-based access control
- ✅ Better security
- ✅ Simplified data structure

Next steps:
- Add more staff members
- Customize roles and permissions
- Build staff self-service features
- Add manager approval workflows
