import os
import psycopg2
from psycopg2.extras import RealDictCursor

def get_db():
    conn = psycopg2.connect(os.environ.get("DATABASE_URL"))
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    return conn, cursor

def init_db():
    conn, cursor = None, None
    try:
        conn, cursor = get_db()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS glicemia (
                id SERIAL PRIMARY KEY,
                data DATE NOT NULL,
                tipo VARCHAR(255) NOT NULL,
                valor REAL NOT NULL
            )
        ''')
        conn.commit()
    except Exception as e:
        print(f"Erro ao inicializar o banco de dados: {e}")
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

if __name__ == '__main__':
    # A inicialização do banco de dados agora dependerá da variável de ambiente
    # para ser executada. Isso será configurado no Render.
    pass
