# Staff-User Merge Migration Guide

## Overview

This migration merges the `staff` table with the `user` table, making every staff member also a user who can log in to the system.

## Benefits

✅ **Single Source of Truth**: One table for all users (admin, staff, managers)  
✅ **Simplified Authentication**: Staff can log in with their credentials  
✅ **Better Role Management**: Clear role hierarchy (admin, manager, staff)  
✅ **Easier Maintenance**: No need to sync between user and staff tables  

## Database Changes

### New User Table Structure

The `user` table now includes staff-related fields:

```sql
user
├── id (primary key)
├── username (login username)
├── auth_key
├── password_hash
├── email
├── phone (NEW - from staff)
├── max_hours_per_week (NEW - from staff)
├── current_hours (NEW - from staff)
├── staff_status (NEW - available/unavailable/on_leave)
├── role (NEW - admin/staff/manager)
├── status (active/inactive)
├── created_at
└── updated_at
```

### Foreign Key Updates

All tables now reference `user` instead of `staff`:

- `staff_skill.user_id` → references `user.id`
- `staff_availability.user_id` → references `user.id`
- `assignment.user_id` → references `user.id`

## Migration Steps

### Step 1: Backup Your Database

```bash
# In phpMyAdmin, export the database first!
# Or use command line:
docker exec staffflow-db mysqldump -u root -proot staffflow > backup.sql
```

### Step 2: Run the Migration SQL

Open phpMyAdmin at http://localhost:8081 and run:

```sql
-- Copy and paste the entire contents of:
backend/migrations/merge_staff_user.sql
```

This will:
1. Add staff fields to user table
2. Migrate existing staff data to user table
3. Update all foreign keys
4. Create admin user if not exists

### Step 3: Insert Sample Data (Optional)

If you want fresh sample data:

```sql
-- Copy and paste the entire contents of:
backend/sample_data_merged.sql
```

This creates:
- 1 admin user (username: `admin`, password: `password`)
- 8 staff users (password: `password123`)
- 5 vendors
- Skills and availability for all staff
- Sample assignments

### Step 4: Verify the Migration

Check in phpMyAdmin:

1. **User table** should have:
   - Admin user with role='admin'
   - Staff users with role='staff'
   - New columns: phone, max_hours_per_week, current_hours, staff_status, role

2. **staff_skill table** should have:
   - Column renamed from `staff_id` to `user_id`

3. **staff_availability table** should have:
   - Column renamed from `staff_id` to `user_id`

4. **assignment table** should have:
   - Column renamed from `staff_id` to `user_id`

### Step 5: Test the Application

1. Open http://localhost:3000
2. Login with admin credentials:
   - Username: `admin`
   - Password: `password`
3. Check that staff list shows all users with role='staff'
4. Verify assignments display correctly

## Login Credentials

### Admin
- Username: `admin`
- Password: `password`

### Staff Members (all have same password)
- Username: `ahmad_abdullah`, `siti_nurhaliza`, `lee_wei_ming`, etc.
- Password: `password123`

## API Changes

### Staff Endpoint

The `/staff` endpoint now returns users with role='staff' or 'manager':

```json
GET /staff

Response:
[
  {
    "id": 2,
    "username": "ahmad_abdullah",
    "email": "ahmad@staffflow.com",
    "phone": "+60 12-345 6789",
    "max_hours_per_week": 40,
    "current_hours": 0,
    "staff_status": "available",
    "role": "staff",
    "name": "ahmad_abdullah",
    "skills": ["Waiter", "Bartender"],
    "availability": ["2024-01-15", "2024-01-16", ...]
  }
]
```

### Assignment Endpoint

Now uses `user_id` instead of `staff_id`:

```json
POST /assignments

Request:
{
  "vendor_id": 1,
  "user_id": 2,  // Changed from staff_id
  "date": "2024-01-15",
  "start_time": "08:00:00",
  "end_time": "16:00:00",
  "role": "Waiter"
}
```

## Frontend Changes

The frontend has been updated to work with the merged structure:

- Dashboard fetches staff from `/staff` (returns users with role='staff')
- All references to `staff_id` changed to `user_id`
- Staff display shows username as name
- Everything else works the same!

## Rollback (If Needed)

If something goes wrong, restore from backup:

```bash
# Stop containers
docker-compose down

# Restore database
docker-compose up -d db
docker exec -i staffflow-db mysql -u root -proot staffflow < backup.sql

# Restart all containers
docker-compose up -d
```

## Troubleshooting

### Error: Column 'staff_id' doesn't exist

The migration wasn't completed. Run the migration SQL again.

### Staff not showing in dashboard

Check that users have `role='staff'` in the user table:

```sql
SELECT id, username, role FROM user WHERE role='staff';
```

### Can't login with staff credentials

Check password hash and status:

```sql
SELECT username, status FROM user WHERE username='ahmad_abdullah';
```

Status should be `10` (active).

## What's Next?

After migration:

1. ✅ Staff members can log in to the system
2. ✅ Role-based access control is easier
3. ✅ Single user management interface
4. ✅ Better security with individual user accounts

You can now:
- Add role-based permissions
- Create manager accounts
- Track individual staff login history
- Implement staff self-service features
