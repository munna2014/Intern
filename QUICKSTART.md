# StaffFlow - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Start Docker (30 seconds)
```bash
docker-compose down
docker-compose up -d
```

Wait for containers to start. Check status:
```bash
docker-compose ps
```

All services should show "Up" status.

### Step 2: Setup Database (2 minutes)

1. Open phpMyAdmin: http://localhost:8081
   - Username: `root`
   - Password: `root`

2. Click on `staffflow` database (left sidebar)

3. Click "SQL" tab at the top

4. Copy and paste ALL the CREATE TABLE statements from `SETUP_DATABASE.md` (section 3)

5. Click "Go" to execute

6. Copy and paste the contents of `backend/sample_data.sql`

7. Click "Go" to execute

### Step 3: Create Admin User (30 seconds)

In phpMyAdmin SQL tab, run:

```sql
INSERT INTO `user` (`username`, `auth_key`, `password_hash`, `email`, `status`, `created_at`, `updated_at`) 
VALUES ('admin', 'test-key', '$2y$13$EjaPFBnZOQsHdGuHI.xvhuDp1fHpo8hKRSk6yshqa9c5EG8s3C3lO', 'admin@staffflow.com', 10, UNIX_TIMESTAMP(), UNIX_TIMESTAMP());
```

### Step 4: Test the Application (1 minute)

1. Open frontend: http://localhost:3000

2. Login with:
   - Username: `admin`
   - Password: `password`

3. You should see:
   - 5 vendors
   - 8 staff members
   - Sample assignments

### Step 5: Test Features

#### Generate Schedule
1. Click "One-Click Schedule Generation" button
2. Schedule will be created automatically
3. View generated assignments in the modal

#### Check-in/Check-out
1. Find an assignment with "scheduled" status
2. Click "Check In" button
3. Status changes to "checked-in"
4. Click "Check Out" button
5. Status changes to "checked-out" with hours calculated

#### View Data
- Click "Available Staff" card to see all staff
- Click "Vendor List" in navbar to see vendors
- All data is now from the database!

## ✅ Verification Checklist

- [ ] Docker containers running (3 containers: db, backend, frontend)
- [ ] phpMyAdmin accessible at http://localhost:8081
- [ ] Database `staffflow` exists with 6 tables
- [ ] Sample data inserted (5 vendors, 8 staff)
- [ ] Admin user created
- [ ] Frontend loads at http://localhost:3000
- [ ] Can login with admin/password
- [ ] Dashboard shows real data
- [ ] Can generate schedule
- [ ] Can check-in/check-out

## 🔧 Troubleshooting

### Frontend not loading
```bash
docker-compose logs frontend
```

Look for "webpack compiled successfully" message.

### Backend API not responding
```bash
docker-compose logs backend
```

Test API directly: http://localhost:8080/vendors

### Database connection error
```bash
docker-compose restart backend
```

### Reset everything
```bash
docker-compose down -v
docker-compose up -d
```

Then redo database setup (Step 2-3).

## 📝 What's Next?

Now that everything is working:

1. **Add your own data**: Add real vendors and staff through the UI
2. **Customize**: Modify the frontend components in `frontend/src/components/`
3. **Extend API**: Add new endpoints in `backend/api/controllers/`
4. **Add features**: Build on top of the existing foundation

## 🎯 Key Features Working

✅ Real-time data from MySQL database
✅ JWT authentication
✅ Vendor management
✅ Staff management with skills
✅ Assignment scheduling
✅ Check-in/check-out with GPS time clock
✅ AI-powered schedule generation
✅ Hot-reload (no Docker restarts needed!)

## 📚 Documentation

- `SETUP_DATABASE.md` - Detailed database setup
- `API_DOCUMENTATION.md` - Complete API reference
- `CHANGES_SUMMARY.md` - What was changed and why

## 🆘 Need Help?

Check the logs:
```bash
# All services
docker-compose logs

# Specific service
docker-compose logs frontend
docker-compose logs backend
docker-compose logs db
```

Restart a service:
```bash
docker-compose restart frontend
docker-compose restart backend
```

## 🎉 Success!

If you can see vendors, staff, and assignments in the dashboard, you're all set! The application is now fully integrated with the database and ready for development.
