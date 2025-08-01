import pytest
from rest_framework.test import APIClient
from django.contrib.auth.models import User

@pytest.mark.django_db
def test_register_and_login():
  client = APIClient()

  # Registro
  response = client.post("/api/auth/users/", {"username": "joao", "password": "senha123"})
  assert response.status_code == 201

  # Login
  response = client.post("/api/auth/jwt/create/", {"username": "joao", "password": "senha123"})
  assert response.status_code == 200
  assert "access" in response.data