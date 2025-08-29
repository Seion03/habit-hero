from fastapi import APIRouter
from typing import List
from .models import HabitStats, OverallStats, CategoryStats, DayStats
from .services import (
    get_habit_stats,
    get_overall_stats,
    get_category_stats,
    get_day_stats
)

router = APIRouter()

@router.get("/habits/{habit_id}/stats", response_model=HabitStats)
async def habit_analytics(habit_id: int):
    return await get_habit_stats(habit_id)

@router.get("/overview", response_model=OverallStats)
async def overall_analytics():
    return await get_overall_stats()

@router.get("/categories/stats", response_model=List[CategoryStats])
async def category_analytics():
    return await get_category_stats()

@router.get("/days/stats", response_model=List[DayStats])
async def day_analytics():
    return await get_day_stats()
