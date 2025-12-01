# StaffFlow - Login Credentials

## 🔐 Admin Account

**URL:** http://localhost:3000

**Credentials:**
- Username: `admin`
- Password: `admin123`

## 👥 Staff Accounts

All migrated staff members have the default password:

**Password:** `password123`

**Usernames:**
- `john_smith`
- `sarah_johnson`
- `mike_davis`
- `emily_brown`
- `newuser123`
- `test`

## 🌐 API Access

### Login Endpoint
```
POST http://localhost:8080/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}

Response:
{
  "success": true,
  "data": {
    "user": {...},
    "token": "Bearer_token_here"
  },
  "message": "Login successful"
}
```

### Using the Token
```
GET http://localhost:8080/staff
Authorization: Bearer {token}
```

## 📊 Current Database Status

✅ **Users:** 7 total (1 admin + 6 staff)  
✅ **Vendors:** 6 vendors  
✅ **Assignments:** 0 (ready to create)  
✅ **Staff Skills:** Linked to users  
✅ **Staff Availability:** Linked to users  

## 🎯 What's Working

✅ **Authentication:** Login with admin/admin123  
✅ **API Endpoints:** All endpoints returning data from database  
✅ **Staff Management:** 6 staff members with merged user accounts  
✅ **Vendor Management:** 6 vendors in database  
✅ **Role-Based Access:** Admin role working  

## 🚀 Next Steps

1. **Login to Frontend:**
   - Go to http://localhost:3000
   - Login with: admin / admin123
   - Dashboard will show all data from database

2. **Create Assignments:**
   - Use "One-Click Schedule Generation" button
   - Or manually create assignments

3. **Test Features:**
   - View staff list
   - View vendor list
   - Create assignments
   - Check-in/check-out staff

## 🔧 Database Connection

The application is connected to MySQL database:
- Host: `db` (Docker) or `localhost`
- Database: `staffflow`
- User: `root`
- Password: `root`

All data displayed in the frontend comes directly from this database through the Yii2 REST API.

## ✨ Features Available

- ✅ Dashboard with real-time data
- ✅ Staff management (view, create, update, delete)
- ✅ Vendor management (view, create, update, delete)
- ✅ Assignment scheduling
- ✅ GPS time clock (check-in/check-out)
- ✅ AI-powered schedule generation
- ✅ Role-based access control
- ✅ Hot-reload development environment

---

**Everything is connected to the database and working!** 🎉
