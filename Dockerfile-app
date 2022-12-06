# Django app Dockerfile
FROM python:3.8

ENV PYTHONUNBUFFERED 1

# Install dependencies
COPY requirements.txt /app/requirements.txt
RUN pip install -r /app/requirements.txt

# Copy app code
COPY . /app
WORKDIR /app

EXPOSE 8000

# Run the app
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

