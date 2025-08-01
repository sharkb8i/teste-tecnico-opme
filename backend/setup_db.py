import psycopg
from psycopg import sql
import os
import subprocess

DB_NAME = os.getenv('DATABASE_NAME', 'todolist')
DB_USER = os.getenv('DATABASE_USER', 'postgres')
DB_PASS = os.getenv('DATABASE_PASSWORD', 'postgres')
DB_HOST = os.getenv('DATABASE_HOST', 'localhost')
DB_PORT = os.getenv('DATABASE_PORT', '5432')

def create_database_if_not_exists():
  conn = psycopg.connect(
    dbname=DB_NAME,
    user=DB_USER,
    password=DB_PASS,
    host=DB_HOST,
    port=DB_PORT,
    autocommit=True,
  )
  cur = conn.cursor()

  cur.execute("SELECT 1 FROM pg_database WHERE datname = %s;", (DB_NAME,))
  exists = cur.fetchone()

  if not exists:
    print(f"Banco '{DB_NAME}' não existe. Criando...")
    cur.execute(sql.SQL("CREATE DATABASE {}").format(sql.Identifier(DB_NAME)))
  else:
    print(f"Banco '{DB_NAME}' já existe.")

  cur.close()
  conn.close()

if __name__ == "__main__":
  create_database_if_not_exists()
  print("Rodando makemigrations...")
  subprocess.run(['python', 'app/manage.py', 'makemigrations', 'tasks'], check=True)
  print("Rodando migrations Django...")
  subprocess.run(['python', 'app/manage.py', 'migrate'])