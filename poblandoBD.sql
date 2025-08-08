INSERT INTO producto (id_producto, nombre, tipo, precio_unitario, unidad_medida, cantidad_mezcal_usada)
VALUES 
  (6, 'Espadín', 'mezcal', 200.00, 'litros', 0.05),
  (5, 'Tobalá', 'mezcal', 250.00, 'litros', 0.06),
  (3, 'Margarita', 'coctel', 180.00, 'pieza', NULL),
  (4, 'Paloma', 'coctel', 170.00, 'pieza', NULL);


INSERT INTO venta (id_venta, fecha, metodo_pago, total)
VALUES 
  (100010, '2025-06-28', 'efectivo', 450.00),
  (100011, '2025-06-29', 'tarjeta', 380.00),
  (100012, '2025-06-30', 'efectivo', 600.00),
  (100013, '2025-07-01', 'tarjeta', 820.00),
  (100014, '2025-07-02', 'efectivo', 540.00),
  (100015, '2025-07-03', 'efectivo', 760.00),
  (100016, '2025-07-04', 'tarjeta', 690.00);


INSERT INTO detalle_venta (id_venta, id_producto, cantidad, subtotal)
VALUES
  (100010, 1, 2, 400.00),
  (100010, 3, 1, 50.00),

  (100011, 2, 1, 250.00),
  (100011, 4, 1, 130.00),

  (100012, 1, 2, 400.00),
  (100012, 3, 2, 200.00),

  (100013, 2, 2, 500.00),
  (100013, 4, 2, 320.00),

  (100014, 1, 1, 200.00),
  (100014, 3, 1, 180.00),
  (100014, 4, 1, 160.00),

  (100015, 2, 2, 500.00),
  (100015, 4, 1, 260.00),

  (100016, 3, 2, 360.00),
  (100016, 1, 1, 200.00),
  (100016, 4, 1, 130.00);
