from flask import Flask, request, jsonify
from flask_cors import CORS
from database import get_db, init_db

app = Flask(__name__)
CORS(app) # Habilita CORS para todas as rotas e origens

# Inicializa o banco de dados na primeira execução
with app.app_context():
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

        with get_db() as db:
            cursor = db.cursor()
            cursor.execute(
                "INSERT INTO glicemia (data, tipo, valor) VALUES (?, ?, ?)",
                (data_val, tipo_val, valor_val)
            )
            db.commit()
            return jsonify({"message": "Registro adicionado com sucesso"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/glicemia', methods=['GET'])
def get_glicemia():
    try:
        start_date = request.args.get('start_date')
        end_date = request.args.get('end_date')

        with get_db() as db:
            cursor = db.cursor()
            if start_date and end_date:
                query = "SELECT * FROM glicemia WHERE data BETWEEN ? AND ?"
                cursor.execute(query, (start_date, end_date))
            else:
                query = "SELECT * FROM glicemia ORDER BY data DESC"
                cursor.execute(query)

            rows = cursor.fetchall()
            results = [dict(row) for row in rows]
            return jsonify(results), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
