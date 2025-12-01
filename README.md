# StaffFlow

A full-stack staff management and scheduling application built with React (frontend) and Yii2 PHP (backend).

## Features

- **Authentication** - JWT-based login system with role-based access
- **Vendor Management** - Add, edit, and manage vendor/client locations
- **Staff Management** - Track staff members, skills, and availability
- **Assignment Scheduling** - Create and manage staff assignments to vendors
- **AI-Powered Scheduling** - One-click automatic schedule generation
- **Check-in/Check-out** - GPS time clock with hours tracking
- **Dashboard** - Real-time overview of staff, vendors, and assignments

## Tech Stack

**Frontend:**
- React 18
- Tailwind CSS
- React Router
- Axios

**Backend:**
- Yii2 PHP Framework (Advanced Template)
- MySQL Database
- RESTful API with JWT Authentication

**Infrastructure:**
- Docker & Docker Compose
- phpMyAdmin for database management

## Quick Start

### Prerequisites
- Docker & Docker Compose installed
- Git

### 1. Clone and Start

```bash
git clone https://github.com/munna2014/Intern.git
cd Intern
git checkout StaffFlow
docker-compose up -d
```

### 2. Setup Database

1. Open phpMyAdmin: http://localhost:8081
   - Username: `root`
   - Password: `root`

2. Select `staffflow` database

3. Import `backend/sample_data.sql` via SQL tab

### 3. Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8080
- **phpMyAdmin:** http://localhost:8081

### Default Login
- Username: `admin`
- Password: `password`

## Project Structure

```
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── context/       # Auth & Theme contexts
│   │   ├── services/      # API service modules
│   │   └── hooks/         # Custom React hooks
│   └── public/
├── backend/               # Yii2 PHP backend
│   ├── api/              # REST API module
│   │   └── controllers/  # API endpoints
│   ├── common/           # Shared models & config
│   │   └── models/       # Database models
│   └── console/          # CLI commands & migrations
└── docker-compose.yml    # Docker orchestration
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/login` | User authentication |
| GET | `/vendors` | List all vendors |
| GET | `/staff` | List all staff |
| GET | `/assignments` | List all assignments |
| POST | `/assignments/generate` | AI schedule generation |
| POST | `/assignments/check-in` | Staff check-in |
| POST | `/assignments/check-out` | Staff check-out |

See [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for complete API reference.

## Development

### Hot Reload
Both frontend and backend support hot reload - changes are reflected immediately without restarting Docker.

### Useful Commands

```bash
# View logs
docker-compose logs -f

# Restart services
docker-compose restart

# Stop all services
docker-compose down

# Reset database
docker-compose down -v
docker-compose up -d
```

## Documentation

- [QUICKSTART.md](QUICKSTART.md) - Detailed setup guide
- [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - API reference
- [SETUP_DATABASE.md](SETUP_DATABASE.md) - Database schema

## License

MIT License
