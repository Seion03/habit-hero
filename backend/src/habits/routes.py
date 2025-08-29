from fastapi import APIRouter, HTTPException
from typing import List
from .models import Habit, HabitCreate
from . import services

router = APIRouter()

HABIT_CATEGORIES = [
    "Health & Fitness",
    "Mental Health", 
    "Productivity",
    "Learning",
    "Social",
    "Creative",
    "Finance",
    "Other"
]

@router.get("/categories")
async def get_categories():
    return {"categories": HABIT_CATEGORIES}

@router.post("/", response_model=Habit)
async def create_habit(habit: HabitCreate):
    if habit.frequency not in ['daily', 'weekly']:
        raise HTTPException(status_code=400, detail="Frequency must be 'daily' or 'weekly'")
    return await services.create_habit(habit)

@router.get("/", response_model=List[Habit])
async def get_habits():
    return await services.get_habits()

@router.get("/{habit_id}", response_model=Habit)
async def get_habit(habit_id: int):
    habit = await services.get_habit(habit_id)
    if not habit:
        raise HTTPException(status_code=404, detail="Habit not found")
    return habit

@router.put("/{habit_id}", response_model=Habit)
async def update_habit(habit_id: int, habit: HabitCreate):
    if habit.frequency not in ['daily', 'weekly']:
        raise HTTPException(status_code=400, detail="Frequency must be 'daily' or 'weekly'")
    updated = await services.update_habit(habit_id, habit)
    if not updated:
        raise HTTPException(status_code=404, detail="Habit not found")
    return updated

@router.delete("/{habit_id}")
async def delete_habit(habit_id: int):
    deleted = await services.delete_habit(habit_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Habit not found")
    return {"message": "Habit deleted successfully"}
