# Authentication Test Guide

## Test Scenarios:

### 1. First Visit (Registration Flow)
1. Open http://localhost:3000
2. Should redirect to `/register` page
3. Fill in registration form:
   - Username: "testuser"
   - Email: "test@example.com" 
   - Password: "password123"
4. Click "Create Account"
5. Should redirect to dashboard
6. User should see limited navigation (Home, Profile, Vendors only)

### 2. Admin Login Flow
1. Click logout button
2. Should redirect to `/login` page
3. Fill in login form:
   - Username: "admin"
   - Password: "admin"
4. Click "Sign In"
5. Should redirect to dashboard
6. User should see full navigation (Home, Profile, Vendors, Dashboard, Assignments, Check-In/Out)

### 3. Regular User Login Flow
1. Click logout button
2. Should redirect to `/login` page
3. Fill in login form:
   - Username: "regularuser"
   - Password: "password"
4. Click "Sign In"
5. Should redirect to dashboard
6. User should see limited navigation (Home, Profile, Vendors only)

### 4. Navigation Access Control
1. As regular user, try to access restricted pages:
   - Should not see Dashboard, Assignments, Check-In/Out buttons
   - Direct URL access to these routes should redirect to login

### 5. Session Persistence
1. Login as admin
2. Refresh page
3. Should remain logged in with full access
4. Logout and refresh
5. Should redirect to login page

## Expected Behavior:
- Registration page shows on first visit
- "Already have an account? Login" link works
- Login/Register forms validate inputs
- Admin users get full access to all features
- Regular users only access Profile and Vendors
- Logout functionality works correctly
- Session persists across page refreshes
