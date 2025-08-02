from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from datetime import datetime, date

app = Flask(__name__)
CORS(app)

# Função para conectar ao banco de dados PostgreSQL
def get_db():
    try:
        conn = psycopg2.connect(os.environ.get("DATABASE_URL"))
        # DEFINE O FUSO HORÁRIO DA SESSÃO PARA UTC
        cursor = conn.cursor()
        cursor.execute("SET TIME ZONE 'UTC';")
        conn.commit()
        cursor.close()
        
        # Agora, abre um novo cursor para a aplicação
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        return conn, cursor
    except Exception as e:
        print(f"Erro ao conectar ao banco de dados: {e}")
        return None, None

def init_db():
    conn, cursor = None, None
    try:
        conn, cursor = get_db()
        if conn:
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

init_db()

@app.route('/api/glicemia', methods=['POST'])
def add_glicemia():
    try:
        data = request.get_json()
        required_fields = ['data', 'tipo', 'valor']
        if not all(field in data for field in required_fields):
            return jsonify({"error": "Campos obrigatórios ausentes"}), 400

        data_val = data['data']
        tipo_val = data['tipo']
        valor_val = data['valor']

        print(f"Log 1: Data recebida do frontend: {data_val}")

        conn, cursor = get_db()
        if not conn:
            return jsonify({"error": "Falha na conexão com o banco de dados"}), 500

        # CONVERSÃO EXPLÍCITA USANDO datetime.strptime
        data_obj = datetime.strptime(data_val, '%Y-%m-%d').date()

        # LOGGING: IMPRIME O OBJETO DE DATA APÓS CONVERSÃO
        print(f"Log 2: Objeto de data do Python: {data_obj}")

        cursor.execute(
            "INSERT INTO glicemia (data, tipo, valor) VALUES (%s, %s, %s)",
            (data_obj, tipo_val, valor_val)
        )
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"message": "Registro adicionado com sucesso"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/glicemia', methods=['GET'])
def get_glicemia():
    try:
        start_date = request.args.get('start_date')
        end_date = request.args.get('end_date')

        conn, cursor = get_db()
        if not conn:
            return jsonify({"error": "Falha na conexão com o banco de dados"}), 500

        if start_date and end_date:
            query = "SELECT * FROM glicemia WHERE data BETWEEN %s AND %s ORDER BY data DESC"
            cursor.execute(query, (start_date, end_date))
        else:
            query = "SELECT * FROM glicemia ORDER BY data DESC"
            cursor.execute(query)

        rows = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify(rows), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
