# StaffFlow API Documentation

Base URL: `http://localhost:8080`

All endpoints (except auth) require Bearer token authentication.

## Authentication

### Login
```
POST /auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "password"
}

Response:
{
  "success": true,
  "token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user": {
    "id": 1,
    "username": "admin",
    "email": "admin@staffflow.com"
  }
}
```

## Vendors

### Get All Vendors
```
GET /vendors
Authorization: Bearer {token}

Response:
[
  {
    "id": 1,
    "name": "Sultan Dines Restaurant",
    "location": "Downtown District, Kuala Lumpur",
    "contact": "+60 3-1234 5678",
    "status": "active"
  }
]
```

### Get Single Vendor
```
GET /vendors/{id}
Authorization: Bearer {token}
```

### Create Vendor
```
POST /vendors
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "New Restaurant",
  "location": "City Center",
  "contact": "+60 12-345 6789",
  "status": "active"
}
```

### Update Vendor
```
PUT /vendors/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Updated Name",
  "location": "New Location"
}
```

### Delete Vendor
```
DELETE /vendors/{id}
Authorization: Bearer {token}
```

## Staff

### Get All Staff
```
GET /staff
Authorization: Bearer {token}

Response:
[
  {
    "id": 1,
    "name": "Ahmad bin Abdullah",
    "phone": "+60 12-345 6789",
    "max_hours_per_week": 40,
    "current_hours": 0,
    "status": "available",
    "skills": ["Waiter", "Bartender"],
    "availability": ["2024-01-15", "2024-01-16"]
  }
]
```

### Get Single Staff
```
GET /staff/{id}
Authorization: Bearer {token}
```

### Create Staff
```
POST /staff
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "New Staff Member",
  "phone": "+60 12-345 6789",
  "max_hours_per_week": 40,
  "status": "available"
}
```

### Update Staff
```
PUT /staff/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Updated Name",
  "status": "unavailable"
}
```

### Delete Staff
```
DELETE /staff/{id}
Authorization: Bearer {token}
```

## Assignments

### Get All Assignments
```
GET /assignments
Authorization: Bearer {token}

Query Parameters:
- vendor_id: Filter by vendor
- staff_id: Filter by staff
- status: Filter by status (scheduled, checked-in, checked-out, cancelled)

Response:
[
  {
    "id": 1,
    "vendorId": 1,
    "vendorName": "Sultan Dines Restaurant",
    "staffId": 1,
    "staffName": "Ahmad bin Abdullah",
    "staffPhone": "+60 12-345 6789",
    "date": "2024-01-15",
    "startTime": "08:00:00",
    "endTime": "16:00:00",
    "role": "Waiter",
    "status": "scheduled",
    "hoursWorked": null,
    "checkInTime": null,
    "checkOutTime": null
  }
]
```

### Get Single Assignment
```
GET /assignments/{id}
Authorization: Bearer {token}
```

### Create Assignment
```
POST /assignments
Authorization: Bearer {token}
Content-Type: application/json

{
  "vendor_id": 1,
  "staff_id": 1,
  "date": "2024-01-15",
  "start_time": "08:00:00",
  "end_time": "16:00:00",
  "role": "Waiter",
  "status": "scheduled"
}
```

### Update Assignment
```
PUT /assignments/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "cancelled"
}
```

### Delete Assignment
```
DELETE /assignments/{id}
Authorization: Bearer {token}
```

### Generate Schedule (AI-powered)
```
POST /assignments/generate
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": {
    "assignments": [...],
    "count": 5
  },
  "message": "Schedule generated successfully"
}
```

### Check In
```
POST /assignments/check-in?id={id}
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": {
    "id": 1,
    "status": "checked-in",
    "checkInTime": "2024-01-15 08:05:23"
  },
  "message": "Checked in successfully"
}
```

### Check Out
```
POST /assignments/check-out?id={id}
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": {
    "id": 1,
    "status": "checked-out",
    "checkOutTime": "2024-01-15 16:10:45",
    "hoursWorked": 8.09
  },
  "message": "Checked out successfully"
}
```

## Status Codes

- `200 OK`: Request successful
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid request data
- `401 Unauthorized`: Missing or invalid token
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

## Error Response Format

```json
{
  "success": false,
  "error": {
    "message": "Error description"
  }
}
```

## CORS

The API allows requests from:
- `http://localhost:3000` (Frontend)

Allowed methods: GET, POST, PUT, DELETE, OPTIONS

## Notes

1. All timestamps are in Unix timestamp format (seconds since epoch)
2. Dates are in `YYYY-MM-DD` format
3. Times are in `HH:MM:SS` format (24-hour)
4. The API uses Yii2 REST framework conventions
5. Bearer token should be included in Authorization header for all protected endpoints
