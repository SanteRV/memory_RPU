-- PASO 1: Conectarse a PostgreSQL con pgAdmin y ejecutar este comando primero
-- (Click derecho en "PostgreSQL 16" -> "Query Tool")

CREATE DATABASE intercambio_nacional
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Spanish_Mexico.1252'
    LC_CTYPE = 'Spanish_Mexico.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

COMMENT ON DATABASE intercambio_nacional
    IS 'Base de datos para el proyecto Intercambio Nacional';
