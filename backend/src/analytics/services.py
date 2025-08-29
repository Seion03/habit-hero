from src.database import get_db_connection
from fastapi import HTTPException
from .models import HabitStats, CategoryStats, DayStats, OverallStats

days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

async def get_habit_stats(habit_id: int) -> HabitStats:
    conn = await get_db_connection()
    try:
        habit = await conn.fetchrow(
            "SELECT id, name, category, frequency FROM habits WHERE id = $1",
            habit_id
        )
        if not habit:
            raise HTTPException(status_code=404, detail="Habit not found")

        checkins = await conn.fetch(
            "SELECT date, completed FROM checkins WHERE habit_id = $1 ORDER BY date ASC",
            habit_id
        )

        if not checkins:
            return HabitStats(
                habit_id=habit_id,
                habit_name=habit["name"],
                category=habit["category"],
                current_streak=0,
                longest_streak=0,
                total_checkins=0,
                success_rate=0.0,
                frequency=habit["frequency"]
            )

        # --- Calculate streaks ---
        current_streak, longest_streak, temp_streak = 0, 0, 0
        total_checkins = len(checkins)
        completed_checkins = sum(1 for c in checkins if c["completed"])

        sorted_checkins = sorted(checkins, key=lambda x: x["date"], reverse=True)
        for checkin in sorted_checkins:
            if checkin["completed"]:
                temp_streak += 1
                longest_streak = max(longest_streak, temp_streak)
            else:
                if current_streak == 0:
                    current_streak = temp_streak
                temp_streak = 0
        if current_streak == 0:
            current_streak = temp_streak

        success_rate = (completed_checkins / total_checkins * 100) if total_checkins > 0 else 0

        return HabitStats(
            habit_id=habit_id,
            habit_name=habit["name"],
            category=habit["category"],
            current_streak=current_streak,
            longest_streak=longest_streak,
            total_checkins=total_checkins,
            success_rate=round(success_rate, 2),
            frequency=habit["frequency"]
        )
    finally:
        await conn.close()


async def get_overall_stats() -> OverallStats:
    conn = await get_db_connection()
    try:
        total_habits = await conn.fetchval("SELECT COUNT(*) FROM habits")
        checkin_stats = await conn.fetchrow(
            "SELECT COUNT(*) as total, SUM(CASE WHEN completed THEN 1 ELSE 0 END) as completed FROM checkins"
        )
        total_checkins = checkin_stats["total"] or 0
        completed = checkin_stats["completed"] or 0
        overall_success_rate = (completed / total_checkins * 100) if total_checkins > 0 else 0

        # --- Best category ---
        category_stats = await conn.fetch("""
            SELECT h.category, COUNT(c.id) as total_checkins,
                   SUM(CASE WHEN c.completed THEN 1 ELSE 0 END) as completed_checkins
            FROM habits h
            LEFT JOIN checkins c ON h.id = c.habit_id
            GROUP BY h.category
            HAVING COUNT(c.id) > 0
        """)
        best_category, best_category_rate = "None", 0
        for cat in category_stats:
            rate = (cat["completed_checkins"] / cat["total_checkins"] * 100) if cat["total_checkins"] > 0 else 0
            if rate > best_category_rate:
                best_category_rate = rate
                best_category = cat["category"]

        # --- Best day ---
        day_stats = await conn.fetch("""
            SELECT EXTRACT(DOW FROM date) as dow,
                   COUNT(*) as total,
                   SUM(CASE WHEN completed THEN 1 ELSE 0 END) as completed
            FROM checkins
            GROUP BY EXTRACT(DOW FROM date)
        """)
        best_day, best_day_rate = "None", 0
        for day in day_stats:
            rate = (day["completed"] / day["total"] * 100) if day["total"] > 0 else 0
            if rate > best_day_rate:
                best_day_rate = rate
                best_day = days[int(day["dow"])]

        return OverallStats(
            total_habits=total_habits,
            total_checkins=total_checkins,
            overall_success_rate=round(overall_success_rate, 2),
            best_category=best_category,
            best_day=best_day
        )
    finally:
        await conn.close()


async def get_category_stats() -> list[CategoryStats]:
    conn = await get_db_connection()
    try:
        rows = await conn.fetch("""
            SELECT h.category,
                   COUNT(DISTINCT h.id) as total_habits,
                   COUNT(c.id) as total_checkins,
                   SUM(CASE WHEN c.completed THEN 1 ELSE 0 END) as completed_checkins
            FROM habits h
            LEFT JOIN checkins c ON h.id = c.habit_id
            GROUP BY h.category
            ORDER BY h.category
        """)
        return [
            CategoryStats(
                category=row["category"],
                total_habits=row["total_habits"],
                average_success_rate=round((row["completed_checkins"] / row["total_checkins"] * 100) if row["total_checkins"] > 0 else 0, 2),
                total_checkins=row["total_checkins"]
            )
            for row in rows
        ]
    finally:
        await conn.close()


async def get_day_stats() -> list[DayStats]:
    conn = await get_db_connection()
    try:
        rows = await conn.fetch("""
            SELECT EXTRACT(DOW FROM date) as dow,
                   COUNT(*) as total,
                   SUM(CASE WHEN completed THEN 1 ELSE 0 END) as completed
            FROM checkins
            GROUP BY EXTRACT(DOW FROM date)
            ORDER BY dow
        """)
        return [
            DayStats(
                day_of_week=days[int(row["dow"])],
                success_rate=round((row["completed"] / row["total"] * 100) if row["total"] > 0 else 0, 2),
                total_checkins=row["total"]
            )
            for row in rows
        ]
    finally:
        await conn.close()
