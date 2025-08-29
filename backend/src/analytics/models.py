from pydantic import BaseModel
from typing import List

class HabitStats(BaseModel):
    habit_id: int
    habit_name: str
    category: str
    current_streak: int
    longest_streak: int
    total_checkins: int
    success_rate: float
    frequency: str

class CategoryStats(BaseModel):
    category: str
    total_habits: int
    average_success_rate: float
    total_checkins: int

class DayStats(BaseModel):
    day_of_week: str
    success_rate: float
    total_checkins: int

class OverallStats(BaseModel):
    total_habits: int
    total_checkins: int
    overall_success_rate: float
    best_category: str
    best_day: str
