from fastapi import APIRouter, HTTPException
from typing import List, Optional
from .models import Checkin, CheckinCreate, CheckinWithHabit
from . import services

router = APIRouter()

"""
Create a new check-in.
"""
@router.post("/", response_model=Checkin)
async def create_checkin(checkin: CheckinCreate):
    new_checkin = await services.create_checkin(checkin)
    if new_checkin is None:
        raise HTTPException(status_code=404, detail="Habit not found")
    return new_checkin


@router.get("/", response_model=List[CheckinWithHabit])
async def get_checkins(habit_id: Optional[int] = None, limit: int = 50):
    return await services.get_checkins(habit_id, limit)


@router.get("/habit/{habit_id}", response_model=List[Checkin])
async def get_habit_checkins(habit_id: int):
    return await services.get_habit_checkins(habit_id)


@router.put("/{checkin_id}", response_model=Checkin)
async def update_checkin(checkin_id: int, checkin: CheckinCreate):
    updated = await services.update_checkin(checkin_id, checkin)
    if not updated:
        raise HTTPException(status_code=404, detail="Check-in not found")
    return updated


@router.delete("/{checkin_id}")
async def delete_checkin(checkin_id: int):
    deleted = await services.delete_checkin(checkin_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Check-in not found")
    return {"message": "Check-in deleted successfully"}

@router.get("/habit/{habit_id}/count")
async def get_checkin_count(habit_id: int):
    return {"count": await services.get_checkin_count(habit_id)}

