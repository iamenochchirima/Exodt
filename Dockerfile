# Django app Dockerfile
FROM python:3.8

ENV PYTHONUNBUFFERED 1

# Install dependencies
COPY requirements.txt /app/requirements.txt
RUN pip install -r /app/requirements.txt

# Copy app code
COPY . /app
WORKDIR /app

ENV STATIC_ROOT=/static

# Collect static files
RUN python manage.py collectstatic --no-input

EXPOSE 8000

# Run the app
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

# MySQL Dockerfile
FROM mysql:8.0

# Copy the database schema
COPY schema.sql /docker-entrypoint-initdb.d/

EXPOSE 3306

# Set the default database to use
ENV MYSQL_DATABASE my_app_db
