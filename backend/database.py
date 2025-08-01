import sqlite3

DATABASE_NAME = "glicemia.db"

def get_db_connection():
    conn = sqlite3.connect(DATABASE_NAME)
    conn.row_factory = sqlite3.Row
    return conn

def create_table():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS glicemia (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            data TEXT NOT NULL,
            tipo_medicao TEXT NOT NULL,
            valor REAL NOT NULL
        );
    """)
    conn.commit()
    conn.close()

if __name__ == "__main__":
    create_table()
