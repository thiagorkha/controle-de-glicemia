from flask import Flask, request, jsonify
from flask_cors import CORS
from database import get_db_connection

app = Flask(__name__)
CORS(app) # Habilita CORS para o frontend React

# Rota para adicionar uma nova medição
@app.route('/medicao', methods=['POST'])
def add_medicao():
    data = request.json
    data_medicao = data.get('data')
    tipo_medicao = data.get('tipo_medicao')
    valor = data.get('valor')

    if not all([data_medicao, tipo_medicao, valor]):
        return jsonify({"error": "Todos os campos são obrigatórios."}), 400

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO glicemia (data, tipo_medicao, valor) VALUES (?, ?, ?)",
                   (data_medicao, tipo_medicao, valor))
    conn.commit()
    conn.close()

    return jsonify({"message": "Medição adicionada com sucesso!"}), 201

# Rota para obter medições com filtro de período
@app.route('/medicoes', methods=['GET'])
def get_medicoes():
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')

    conn = get_db_connection()
    cursor = conn.cursor()

    if start_date and end_date:
        cursor.execute("SELECT * FROM glicemia WHERE data BETWEEN ? AND ? ORDER BY data, tipo_medicao",
                       (start_date, end_date))
    else:
        cursor.execute("SELECT * FROM glicemia ORDER BY data, tipo_medicao")

    medicoes = [dict(row) for row in cursor.fetchall()]
    conn.close()

    # Reorganizar os dados para o formato de tabela do frontend
    # A lógica aqui é agrupar as medições por data
    tabela = {}
    for medicao in medicoes:
        data = medicao['data']
        if data not in tabela:
            tabela[data] = {'data': data}
        tabela[data][medicao['tipo_medicao']] = medicao['valor']

    return jsonify(list(tabela.values()))

if __name__ == '__main__':
    from database import create_table
    create_table()
    app.run(debug=True)
