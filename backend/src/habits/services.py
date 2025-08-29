from src.database import get_db_connection
from .models import Habit, HabitCreate

async def create_habit(habit: HabitCreate) -> Habit:
    conn = await get_db_connection()
    try:
        row = await conn.fetchrow('''
            INSERT INTO habits (name, frequency, category, start_date)
            VALUES ($1, $2, $3, $4)
            RETURNING id, name, frequency, category, start_date, created_at
        ''', habit.name, habit.frequency, habit.category, habit.start_date)
        return Habit(**dict(row))
    finally:
        await conn.close()

async def get_habits() -> list[Habit]:
    conn = await get_db_connection()
    try:
        rows = await conn.fetch('''
            SELECT id, name, frequency, category, start_date, created_at
            FROM habits
            ORDER BY created_at DESC
        ''')
        return [Habit(**dict(row)) for row in rows]
    finally:
        await conn.close()

async def get_habit(habit_id: int) -> Habit | None:
    conn = await get_db_connection()
    try:
        row = await conn.fetchrow('''
            SELECT id, name, frequency, category, start_date, created_at
            FROM habits
            WHERE id = $1
        ''', habit_id)
        return Habit(**dict(row)) if row else None
    finally:
        await conn.close()

async def update_habit(habit_id: int, habit: HabitCreate) -> Habit | None:
    conn = await get_db_connection()
    try:
        row = await conn.fetchrow('''
            UPDATE habits
            SET name = $1, frequency = $2, category = $3, start_date = $4
            WHERE id = $5
            RETURNING id, name, frequency, category, start_date, created_at
        ''', habit.name, habit.frequency, habit.category, habit.start_date, habit_id)
        return Habit(**dict(row)) if row else None
    finally:
        await conn.close()

async def delete_habit(habit_id: int) -> bool:
    conn = await get_db_connection()
    try:
        result = await conn.execute('DELETE FROM habits WHERE id = $1', habit_id)
        return result != 'DELETE 0'
    finally:
        await conn.close()
