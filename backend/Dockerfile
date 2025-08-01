FROM python:3.10

WORKDIR /app

COPY backend/app/requirements.txt .
RUN pip install -r requirements.txt

COPY wait-for-it.sh .
RUN chmod +x wait-for-it.sh

COPY . .

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]