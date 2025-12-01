# StaffFlow - Docker Setup

## 🚀 One Command to Run Everything

```bash
docker-compose up -d
```

That's it! This will start:
- ✅ MySQL Database (port 3306)
- ✅ Yii2 Backend API (port 8080)
- ✅ React Frontend (port 3000)

---

## 📋 Prerequisites

Install Docker Desktop:
- **Windows**: https://docs.docker.com/desktop/install/windows-install/
- **Mac**: https://docs.docker.com/desktop/install/mac-install/
- **Linux**: https://docs.docker.com/desktop/install/linux-install/

---

## 🎯 Quick Start

### 1. Start Everything
```bash
docker-compose up -d
```

### 2. Wait for Services (30 seconds)
```bash
docker-compose ps
```

### 3. Configure Database (First Time Only)

Edit `backend/common/config/main-local.php`:
```php
<?php
return [
    'components' => [
        'db' => [
            'class' => 'yii\db\Connection',
            'dsn' => 'mysql:host=db;dbname=staffflow',
            'username' => 'staffflow',
            'password' => 'staffflow123',
            'charset' => 'utf8',
        ],
    ],
];
```

**Important**: Use `host=db` (not `localhost`)!

### 4. Run Migrations
```bash
docker-compose exec backend php yii migrate
```

### 5. Open Browser
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080

### 6. Login
- Username: `admin`
- Password: `admin123`

---

## 🛠️ Useful Commands

### View Status
```bash
docker-compose ps
```

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f frontend
docker-compose logs -f backend
docker-compose logs -f db
```

### Stop Everything
```bash
docker-compose down
```

### Restart a Service
```bash
docker-compose restart frontend
docker-compose restart backend
```

### Access Backend Shell
```bash
docker-compose exec backend bash
```

### Access Frontend Shell
```bash
docker-compose exec frontend sh
```

### Run Yii Commands
```bash
docker-compose exec backend php yii migrate
docker-compose exec backend php yii cache/flush-all
```

### Access Database
```bash
docker-compose exec db mysql -u staffflow -pstaffflow123 staffflow
```

---

## 📝 Database Credentials

- Host: `localhost` (or `db` from inside containers)
- Database: `staffflow`
- Username: `staffflow`
- Password: `staffflow123`
- Root Password: `root`

---

## 🔧 Troubleshooting

### Port Already in Use
Change ports in `docker-compose.yml`:
```yaml
frontend:
  ports:
    - "3001:3000"  # Use different port
```

### Database Connection Failed
1. Wait 30 seconds for DB to initialize
2. Use `host=db` in config (not `localhost`)
3. Restart backend: `docker-compose restart backend`

### Backend 404 Errors
1. Check logs: `docker-compose logs backend`
2. Verify API structure exists in `backend/api/`
3. Restart: `docker-compose restart backend`

### Frontend Won't Start
```bash
docker-compose exec frontend rm -rf node_modules
docker-compose restart frontend
```

### Changes Not Reflecting
```bash
docker-compose restart backend
# or
docker-compose restart frontend
```

---

## 🧹 Clean Up

### Stop All Services
```bash
docker-compose down
```

### Remove Everything (Fresh Start)
```bash
docker-compose down -v
docker system prune -a
```

---

## 📊 What's Running?

| Service | Port | URL |
|---------|------|-----|
| Frontend | 3000 | http://localhost:3000 |
| Backend API | 8080 | http://localhost:8080 |
| MySQL | 3306 | localhost:3306 |

---

## ✅ Success!

Your entire StaffFlow application is now running in Docker! 🎉

**Next Steps:**
1. Configure database in `backend/common/config/main-local.php`
2. Run migrations: `docker-compose exec backend php yii migrate`
3. Open http://localhost:3000
4. Login with admin/admin123
