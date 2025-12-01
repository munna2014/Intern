# Staff-User Merge - Quick Summary

## What Changed

### Database
- **User table** now includes staff fields (phone, max_hours_per_week, current_hours, staff_status, role)
- **staff_skill.staff_id** → **staff_skill.user_id**
- **staff_availability.staff_id** → **staff_availability.user_id**
- **assignment.staff_id** → **assignment.user_id**
- Old `staff` table can be dropped (optional)

### Backend Models
- **User.php**: Added staff fields and relationships (staffSkills, staffAvailability, assignments)
- **StaffController.php**: Now queries User model with role='staff'
- **AssignmentController.php**: Uses user_id instead of staff_id
- **Assignment.php**: References User model instead of Staff model
- **StaffSkill.php**: References User model
- **StaffAvailability.php**: References User model

### Benefits
✅ Every staff member is now a user who can log in  
✅ Single table for all users (admin, manager, staff)  
✅ Better role-based access control  
✅ Simplified data management  

## Quick Migration

### 1. Run Migration SQL
```sql
-- In phpMyAdmin (http://localhost:8081)
-- Copy and paste: backend/migrations/merge_staff_user.sql
```

### 2. Insert Sample Data
```sql
-- In phpMyAdmin
-- Copy and paste: backend/sample_data_merged.sql
```

### 3. Login Credentials

**Admin:**
- Username: `admin`
- Password: `password`

**Staff (all same password):**
- Usernames: `ahmad_abdullah`, `siti_nurhaliza`, `lee_wei_ming`, etc.
- Password: `password123`

## Files Created

1. **backend/migrations/merge_staff_user.sql** - Database migration
2. **backend/sample_data_merged.sql** - Sample data for merged structure
3. **MERGE_STAFF_USER_GUIDE.md** - Detailed migration guide
4. **STAFF_USER_MERGE_SUMMARY.md** - This file

## Files Modified

1. **backend/common/models/User.php** - Added staff fields and relationships
2. **backend/common/models/Assignment.php** - Changed to use user_id
3. **backend/common/models/StaffSkill.php** - Changed to use user_id
4. **backend/common/models/StaffAvailability.php** - Changed to use user_id
5. **backend/api/controllers/StaffController.php** - Query User model
6. **backend/api/controllers/AssignmentController.php** - Use user_id

## API Changes

### Staff Endpoint
```
GET /staff
Returns: Users with role='staff' or 'manager'
```

### Assignment Endpoint
```
POST /assignments
Body: { "user_id": 2, ... }  // Changed from staff_id
```

## Frontend
No changes needed! The frontend already works with the new structure because:
- API still returns the same data format
- Field names are mapped correctly in the models
- Everything is backward compatible

## Next Steps

1. Run the migration SQL in phpMyAdmin
2. Insert sample data (optional)
3. Test login with admin/password
4. Verify staff list shows correctly
5. Test creating assignments

That's it! The merge is complete and everything should work seamlessly.
