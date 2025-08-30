# 🎯 Habit Hero - Complete Habit Tracking Application

A full-stack habit tracking application built with React, FastAPI, and PostgreSQL, orchestrated with Docker Compose.

## ✨ Features

- **Habit Management**: Create habits with frequency (daily/weekly), category, and start date
- **Progress Tracking**: Check-in system with streak calculation
- **Analytics Dashboard**: View completion rates and performance metrics
- **Category System**: Organize habits by Health & Fitness, Mental Health, Productivity, etc.
- **Responsive Design**: Modern interface built with React and Tailwind CSS

## 🏗 Architecture

- **Frontend**: React 18 with Tailwind CSS, served by Nginx
- **Backend**: FastAPI with async PostgreSQL operations
- **Database**: PostgreSQL 15 with persistent volumes
- **Orchestration**: Docker Compose for multi-container deployment

## 📁 Project Structure

```
habit-hero/
├── backend/
│   ├── src/
│   │   ├── main.py                 # FastAPI application
│   │   ├── database.py             # Database connection & setup
│   │   ├── habits/                 # Habit management
│   │   ├── checkins/               # Check-in tracking
│   │   └── analytics/              # Analytics & statistics
│   ├── requirements.txt
│   └── dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/             # React components
│   │   ├── hooks/                  # Custom hooks
│   │   ├── pages/                  # Application pages
│   │   └── services/               # API layer
│   ├── package.json
│   └── dockerfile
├── docker-compose.yml
└── .env
```

## 🚀 Quick Start

### Prerequisites
- Docker Desktop installed and running
- Git for cloning

### Setup & Run

1. **Clone repository**
   ```bash
   git clone <your-repo-url>
   cd habit-hero
   ```

2. **Start Docker Desktop**
   - Ensure Docker Desktop is running on your system

3. **Build and start application**
   ```bash
   docker-compose up --build
   ```

4. **Access application**
   - Frontend: http://localhost:3000
   - API Documentation: http://localhost:8000/docs

## 🎯 Key API Endpoints

- `POST /api/habits/` - Create habit
- `GET /api/habits/` - Get all habits
- `POST /api/checkins/` - Create check-in
- `GET /api/analytics/overview` - Get statistics

## 🛠 Development Commands

**View logs:**
```bash
docker-compose logs backend
docker-compose logs frontend
```

**Reset database:**
```bash
docker-compose down -v
docker-compose up --build
```

**Stop services:**
```bash
docker-compose down
```

## 📝 Environment Configuration

The application uses the following environment variables (configured in `.env`):
- `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`
- `DATABASE_URL`

## 🔧 Built With

- **Frontend**: React 18, Tailwind CSS, Recharts, Lucide React
- **Backend**: FastAPI, AsyncPG, Pydantic
- **Database**: PostgreSQL 15
- **Deployment**: Docker, Docker Compose, Nginx

---

Built with FastAPI, React, Tailwind CSS, and Docker.
