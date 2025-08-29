from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime


class CheckinCreate(BaseModel):
    habit_id: int
    date: date
    completed: bool = True
    notes: Optional[str] = None


class Checkin(BaseModel):
    id: int
    habit_id: int
    date: date
    completed: bool
    notes: Optional[str]
    created_at: datetime


class CheckinWithHabit(BaseModel):
    id: int
    habit_id: int
    habit_name: str
    date: date
    completed: bool
    notes: Optional[str]
    created_at: datetime
