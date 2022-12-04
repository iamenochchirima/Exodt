FROM python:3.8

COPY requirements.txt /tmp/
RUN pip3 install -r /tmp/requirements.txt

COPY . /app
WORKDIR /app

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
