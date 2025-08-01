import os
import psycopg2 # Biblioteca padrão para PostgreSQL em Python
from psycopg2 import sql

# A função de conexão lê a URL do banco de dados das variáveis de ambiente.
# O Render injeta esta variável automaticamente.
def get_db_connection():
    try:
        # A variável de ambiente DATABASE_URL contém todas as informações necessárias.
        # Exemplo: 'postgresql://user:password@host:port/database'
        conn = psycopg2.connect(os.environ.get("DATABASE_URL"))
        return conn
    except Exception as e:
        # Em caso de erro, imprime a mensagem para facilitar a depuração.
        print(f"Erro ao conectar ao banco de dados: {e}")
        return None

# Exemplo de uso
# if __name__ == '__main__':
#     conn = get_db_connection()
#     if conn:
#         print("Conexão com o banco de dados estabelecida com sucesso!")
#         # Aqui você pode adicionar lógica para criar tabelas, inserir dados, etc.
#         conn.close()
#     else:
#         print("Falha ao conectar ao banco de dados.")
