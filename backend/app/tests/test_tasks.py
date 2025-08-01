import pytest
from rest_framework.test import APIClient
from django.contrib.auth.models import User
from tasks.models import Task

@pytest.mark.django_db
def test_crud_task_authenticated():
  user = User.objects.create_user(username="ana", password="123456")
  client = APIClient()

  # Login e salvar token
  res = client.post("/api/auth/jwt/create/", {"username": "ana", "password": "123456"})
  token = res.data["access"]
  client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")

  # Criar tarefa
  res = client.post("/api/tasks/", {"title": "Estudar", "description": "pytest"})
  assert res.status_code == 201
  assert res.data["title"] == "Estudar"

  task_id = res.data["id"]

  # Listar tarefas
  res = client.get("/api/tasks/")
  assert res.status_code == 200
  assert len(res.data["results"]) == 1

  # Atualizar tarefa
  res = client.put(f"/api/tasks/{task_id}/", {"title": "Estudar mais", "description": "", "is_done": True})
  assert res.data["is_done"] is True

  # Deletar
  res = client.delete(f"/api/tasks/{task_id}/")
  assert res.status_code == 204