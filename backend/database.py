import sqlite3

DATABASE = 'glicemia.db'

def get_db():
    db = sqlite3.connect(DATABASE)
    db.row_factory = sqlite3.Row
    return db

def init_db():
    with get_db() as db:
        cursor = db.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS glicemia (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                data TEXT NOT NULL,
                tipo TEXT NOT NULL,
                valor REAL NOT NULL
            )
        ''')
        db.commit()

if __name__ == '__main__':
    init_db()
    print("Banco de dados 'glicemia.db' inicializado.")
