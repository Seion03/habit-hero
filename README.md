# 🎯 Habit Hero - Complete Habit Tracking Application

A full-stack habit tracking application built with React, FastAPI, and PostgreSQL, orchestrated with Docker Compose.

## ✨ Features

- **🎯 Habit Management**: Create habits with categories, frequencies (daily/weekly), and track streaks
- **✅ One-Click Check-ins**: Mark habits complete directly from habit cards  
- **📊 Analytics Dashboard**: Success rates, category performance, and streak tracking
- **📱 Responsive Design**: Modern interface with Tailwind CSS and smooth animations

## 🏗 Architecture

```
React Frontend (3000) ◄──► FastAPI Backend (8000) ◄──► PostgreSQL (5432)
```

## 🚀 Quick Start

### Prerequisites
- Docker Desktop installed and running
- Git for cloning

### Setup
```bash
# 1. Clone repository
git clone <your-repo-url>
cd habit-hero

# 2. Create .env file in root directory
cat > .env << EOF
# Database Configuration
POSTGRES_USER=habituser
POSTGRES_PASSWORD=habitpass123
POSTGRES_DB=habitdb
DATABASE_URL=postgresql://habituser:habitpass123@db:5432/habitdb

# Application Configuration
JWT_SECRET=2f4c9f4d1e9f8e53a1f0b92b29c8d47d4f9c88e1b9d327f7d5e891bb1e3f5e7d
API_VERSION=v1
EOF

# 3. Start application
docker-compose up --build

# 4. Access your app
# Frontend: http://localhost:3000
# API Docs: http://localhost:8000/docs
```

## 🔌 Key API Endpoints

### Habits
- `GET/POST /api/habits/` - List/Create habits
- `DELETE /api/habits/{id}` - Delete habit

### Check-ins  
- `GET/POST /api/checkins/` - List/Create check-ins
- `GET /api/checkins/habit/{id}` - Get habit check-ins

### Analytics
- `GET /api/analytics/overview` - Overall statistics
- `GET /api/analytics/habits/{id}/stats` - Habit analytics

## 🛠 Tech Stack

**Frontend**: React 18, Tailwind CSS, Recharts, Nginx  
**Backend**: FastAPI, AsyncPG, Pydantic  
**Database**: PostgreSQL 15  
**Infrastructure**: Docker, Docker Compose

## 🎮 Usage

1. **Create Habit**: Click "New Habit" → Enter details → Save
2. **Track Progress**: Click "Mark Complete" on habit cards  
3. **View Analytics**: Switch to Analytics tab for insights
4. **Build Streaks**: Complete habits daily to build momentum

## 🔧 Development Commands

```bash
# View logs
docker-compose logs backend
docker-compose logs frontend

# Reset database (⚠️ Deletes all data)
docker-compose down -v
docker-compose up --build

# Stop services
docker-compose down
```

## 📁 Project Structure

```
habit-hero/
├── frontend/          # React app with Tailwind CSS
├── backend/           # FastAPI with async PostgreSQL  
├── docker-compose.yml # Multi-container orchestration
├── .env              # Environment variables
└── README.md         # This file
```

## 🚨 Troubleshooting

**Containers won't start**: `docker-compose down && docker-compose up --build`  
**Port conflicts**: Kill processes on ports 3000, 8000, 5432  
**Build fails**: Remove `node_modules` and rebuild

---

**Built with ❤️ using FastAPI, React, PostgreSQL, and Docker**
