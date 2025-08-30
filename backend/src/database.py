import asyncpg
import os
from datetime import datetime
from dotenv import load_dotenv


load_dotenv()


DATABASE_URL = os.getenv("DATABASE_URL")

async def get_db_connection():
    """Get database connection"""
    return await asyncpg.connect(DATABASE_URL)

async def init_db():
    """Initialize database tables"""
    conn = await get_db_connection()
    
    try:
        # Create habits table
        await conn.execute('''
            CREATE TABLE IF NOT EXISTS habits (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                frequency VARCHAR(20) NOT NULL CHECK (frequency IN ('daily', 'weekly')),
                category VARCHAR(100) NOT NULL,
                start_date DATE NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        # Create checkins table
        await conn.execute('''
            CREATE TABLE IF NOT EXISTS checkins (
                id SERIAL PRIMARY KEY,
                habit_id INTEGER REFERENCES habits(id) ON DELETE CASCADE,
                date DATE NOT NULL,
                completed BOOLEAN DEFAULT TRUE,
                notes TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(habit_id, date)
            )
        ''')
        
        print(" Database tables initialized successfully")
        
    except Exception as e:
        print(f" Error initializing database: {e}")
    finally:
        await conn.close()