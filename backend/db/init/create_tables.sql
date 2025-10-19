-- Tabla de productos
CREATE TABLE IF NOT EXISTS productos (
  id BIGSERIAL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT,
  precio NUMERIC(12,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabla de inventario
CREATE TABLE IF NOT EXISTS inventario (
  id BIGSERIAL PRIMARY KEY,
  producto_id BIGINT NOT NULL,
  cantidad INT NOT NULL DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  CONSTRAINT fk_producto FOREIGN KEY(producto_id)
    REFERENCES productos(id) ON DELETE CASCADE
);