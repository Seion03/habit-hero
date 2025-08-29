from src.database import get_db_connection
from .models import Checkin, CheckinCreate, CheckinWithHabit


async def create_checkin(checkin: CheckinCreate) -> Checkin:
    conn = await get_db_connection()
    try:
        # Check if habit exists
        habit_exists = await conn.fetchval(
            'SELECT EXISTS(SELECT 1 FROM habits WHERE id = $1)',
            checkin.habit_id
        )
        if not habit_exists:
            return None

        row = await conn.fetchrow('''
            INSERT INTO checkins (habit_id, date, completed, notes)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (habit_id, date)
            DO UPDATE SET completed = $3, notes = $4
            RETURNING id, habit_id, date, completed, notes, created_at
        ''', checkin.habit_id, checkin.date, checkin.completed, checkin.notes)

        return Checkin(**dict(row))
    finally:
        await conn.close()


async def get_checkins(habit_id: int | None = None, limit: int = 50) -> list[CheckinWithHabit]:
    conn = await get_db_connection()
    try:
        if habit_id:
            query = '''
                SELECT c.id, c.habit_id, h.name as habit_name, c.date, c.completed, c.notes, c.created_at
                FROM checkins c
                JOIN habits h ON c.habit_id = h.id
                WHERE c.habit_id = $1
                ORDER BY c.date DESC
                LIMIT $2
            '''
            rows = await conn.fetch(query, habit_id, limit)
        else:
            query = '''
                SELECT c.id, c.habit_id, h.name as habit_name, c.date, c.completed, c.notes, c.created_at
                FROM checkins c
                JOIN habits h ON c.habit_id = h.id
                ORDER BY c.date DESC
                LIMIT $1
            '''
            rows = await conn.fetch(query, limit)

        return [CheckinWithHabit(**dict(row)) for row in rows]
    finally:
        await conn.close()


async def get_habit_checkins(habit_id: int) -> list[Checkin]:
    conn = await get_db_connection()
    try:
        rows = await conn.fetch('''
            SELECT id, habit_id, date, completed, notes, created_at
            FROM checkins
            WHERE habit_id = $1
            ORDER BY date DESC
        ''', habit_id)

        return [Checkin(**dict(row)) for row in rows]
    finally:
        await conn.close()


async def update_checkin(checkin_id: int, checkin: CheckinCreate) -> Checkin | None:
    conn = await get_db_connection()
    try:
        row = await conn.fetchrow('''
            UPDATE checkins
            SET completed = $1, notes = $2
            WHERE id = $3
            RETURNING id, habit_id, date, completed, notes, created_at
        ''', checkin.completed, checkin.notes, checkin_id)

        return Checkin(**dict(row)) if row else None
    finally:
        await conn.close()


async def delete_checkin(checkin_id: int) -> bool:
    conn = await get_db_connection()
    try:
        result = await conn.execute('DELETE FROM checkins WHERE id = $1', checkin_id)
        return result != 'DELETE 0'
    finally:
        await conn.close()

async def get_checkin_count(habit_id: int) -> int:
    conn = await get_db_connection()
    try:
        return await conn.fetchval(
            "SELECT COUNT(*) FROM checkins WHERE habit_id = $1 AND completed = TRUE",
            habit_id
        )
    finally:
        await conn.close()

