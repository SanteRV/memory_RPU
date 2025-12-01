-- Crear la base de datos (ejecutar primero en pgAdmin)
-- CREATE DATABASE intercambio_nacional;

-- Conectarse a la base de datos intercambio_nacional y ejecutar lo siguiente:

-- Tabla para almacenar las experiencias compartidas
CREATE TABLE IF NOT EXISTS experiencias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    ciudad VARCHAR(255) NOT NULL,
    experiencia TEXT NOT NULL,
    foto_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índice para búsquedas por ciudad (útil para el mapa interactivo)
CREATE INDEX idx_experiencias_ciudad ON experiencias(ciudad);

-- Índice para ordenar por fecha
CREATE INDEX idx_experiencias_created_at ON experiencias(created_at DESC);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar updated_at
CREATE TRIGGER update_experiencias_updated_at BEFORE UPDATE
    ON experiencias FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Verificar la tabla creada
SELECT * FROM experiencias;
