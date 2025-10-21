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

INSERT INTO productos (nombre, descripcion, precio)
VALUES
('Camiseta', 'Camiseta básica de algodón', 29.99),
('Pantalón', 'Pantalón de mezclilla azul', 59.90),
('Zapatos', 'Zapatos deportivos unisex', 89.50);

INSERT INTO inventario (producto_id, cantidad)
VALUES
(1, 50),
(2, 30),
(3, 10);