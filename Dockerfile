FROM python:3.8
COPY requirements.txt /app/requirements.txt
RUN pip install --upgrade pip
RUN pip install -r /app/requirements.txt
COPY . /app
WORKDIR /app
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
