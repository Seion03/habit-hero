from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import asyncpg
import os

from database import init_db
from habits.routes import router as habits_router
from checkins.routes import router as checkins_router
from analytics.routes import router as analytics_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize database on startup
    await init_db()
    yield

app = FastAPI(
    title="Habit Hero API",
    description="A comprehensive habit tracking application",
    version="1.0.0",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://frontend:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(habits_router, prefix="/api/habits", tags=["habits"])
app.include_router(checkins_router, prefix="/api/checkins", tags=["check-ins"])
app.include_router(analytics_router, prefix="/api/analytics", tags=["analytics"])

@app.get("/")
async def root():
    return {"message": "Habit Hero API is running!"}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "service": "habit-hero-backend"}