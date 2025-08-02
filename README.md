# 📝 To-Do List App — Teste Técnico PyJr

Aplicação full-stack para gerenciamento de tarefas (To-Do List), desenvolvida como parte de um teste técnico. Usuários podem registrar-se, autenticar via JWT, criar tarefas, marcar como concluídas, editar, filtrar e visualizar por paginação.

## 🚀 Tecnologias utilizadas

### Backend:
- Python 3.10+
- Django 4
- Django REST Framework
- Djoser + SimpleJWT (autenticação)
- Django Filter
- Pytest (testes)

### Frontend:
- React 18 + Vite
- TypeScript
- Axios
- React Router

## 📂 Estrutura do projeto

```bash
.
├── backend/
│ ├── app/
│ │ ├── tasks/
│ │ ├── users/
│ │ ├── tests/
│ │ └── core/ 
│ │     ├── settings.py
│ │     ├── urls.py
│ ├── pytest.ini
│ ├── manage.py
│ ├── setup_db.py
│ ├── requirements.txt
│ ├── Dockerfile
├── frontend/
│ ├── src/
│ │ ├── auth/
│ │ ├── pages/
│ │ ├── services/
│ │ ├── App.tsx, ...
│ ├── package.json
│ ├── Dockerfile
├── .env
├── .env.example
├── .gitignore
├── INSTRUCTIONS.md
├── README.md
├── docker-compose.yml
├── wait-for-it.sh
```

## ✅ Funcionalidades implementadas

- ✅ Cadastro e login com JWT
- ✅ CRUD de tarefas
- ✅ Marcar tarefas como concluídas ou não
- ✅ Filtragem de tarefas por status
- ✅ Paginação
- ✅ Frontend com React
- ✅ Backend com Django REST
- ✅ Testes automatizados com `pytest`
- ✅ Docker + Docker Compose

## 🧠 Decisões Técnicas

- 🔐 **Djoser + SimpleJWT**: usados para simplificar endpoints de autenticação (login, registro, etc.).
- 📦 **DRF ViewSets**: facilita a exposição de endpoints RESTful com menor boilerplate.
- 🎛️ **Axios com Interceptor**: facilita o envio automático do token JWT em cada requisição.
- 🔍 **django-filter**: permite aplicar filtros diretamente via query string, sem custom queries.
- 💡 **Context API para Auth**: abstrai e centraliza o controle de autenticação no frontend.

## ⚙️ Como rodar localmente (sem Docker)

### 🔁 Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate             # ou .venv\Scripts\activate no Windows

pip install -r requirements.txt
$env:DEBUG="True"; python setup_db.py # powershell
# DEBUG=True python setup_db.py       # se for linux  

cd app
python manage.py runserver
```

### ⚛️ Frontend

```bash
cd frontend
npm install
npm run dev
```

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend (API): [http://localhost:8000](http://localhost:8000)

## 🐳 Como rodar com Docker + Docker Compose

### Pré-requisitos

- Docker e Docker Compose instalados

### Rodar tudo

```bash
docker-compose up --build
```

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend (API): [http://localhost:8000](http://localhost:8000)

## 🧪 Rodar os testes

```bash
cd backend/app
pytest
```

## 📮 Endpoints principais

- `POST /api/auth/users/` → Registro
- `POST /api/auth/jwt/create/` → Login (retorna token)
- `GET /api/tasks/` → Listar tarefas do usuário autenticado
- `POST /api/tasks/` → Criar tarefa
- `PUT /api/tasks/{id}/` → Editar tarefa
- `DELETE /api/tasks/{id}/` → Deletar tarefa

## 👨‍💻 Autor

Desenvolvido por Bruno Diedrich para o teste técnico da Advice Health.