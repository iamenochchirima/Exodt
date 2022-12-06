# MySQL Dockerfile
FROM mysql:8.0

# Copy the database schema
COPY exodtdb.sql /docker-entrypoint-initdb.d/

EXPOSE 3306

# Set the default database to use
ENV MYSQL_DATABASE my_app_db
