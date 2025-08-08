const pool = require('../db');

exports.insertarProducto = async ({ nombre, tipo, precio_unitario, unidad_medida, cantidad_mezcal_usada }) => {
  const { rows } = await pool.query(
    `INSERT INTO producto (nombre, tipo, precio_unitario, unidad_medida, cantidad_mezcal_usada)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [nombre, tipo, precio_unitario, unidad_medida, cantidad_mezcal_usada]
  );
  return rows[0];
};

exports.obtenerProductos = async () => {
  const { rows } = await pool.query('SELECT * FROM producto ORDER BY id_producto');
  return rows;
};

exports.obtenerProductoPorId = async (id) => {
  const { rows } = await pool.query('SELECT * FROM producto WHERE id_producto = $1', [id]);
  return rows[0];
};

exports.actualizarProducto = async (id, data) => {
  const { nombre, tipo, precio_unitario, unidad_medida, cantidad_mezcal_usada } = data;
  const { rows } = await pool.query(
    `UPDATE producto SET nombre = $1, tipo = $2, precio_unitario = $3,
     unidad_medida = $4, cantidad_mezcal_usada = $5 WHERE id_producto = $6 RETURNING *`,
    [nombre, tipo, precio_unitario, unidad_medida, cantidad_mezcal_usada, id]
  );
  return rows[0];
};

exports.eliminarProducto = async (id) => {
  const { rows } = await pool.query('DELETE FROM producto WHERE id_producto = $1 RETURNING *', [id]);
  return rows[0];
};
