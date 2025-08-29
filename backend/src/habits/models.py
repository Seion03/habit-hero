from pydantic import BaseModel
from datetime import date, datetime

# Input model
class HabitCreate(BaseModel):
    name: str
    frequency: str  # 'daily' or 'weekly'
    category: str
    start_date: date

# Output model
class Habit(BaseModel):
    id: int
    name: str
    frequency: str
    category: str
    start_date: date
    created_at: datetime
