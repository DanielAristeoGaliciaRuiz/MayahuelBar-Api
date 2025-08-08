const pool = require('../db');

exports.insertarVenta = async ({ id_venta, fecha, metodo_pago, total, productos }) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    await client.query(
      'INSERT INTO venta (id_venta, fecha, metodo_pago, total) VALUES ($1, $2, $3, $4)',
      [id_venta, fecha, metodo_pago, total]
    );

    for (const prod of productos) {
      await client.query(
        'INSERT INTO detalle_venta (id_venta, id_producto, cantidad, subtotal) VALUES ($1, $2, $3, $4)',
        [id_venta, prod.id_producto, prod.cantidad, prod.subtotal]
      );
    }

    await client.query('COMMIT');
    return { mensaje: 'Venta registrada con éxito' };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

exports.obtenerVentas = async () => {
  const { rows } = await pool.query('SELECT * FROM venta ORDER BY fecha DESC');
  return rows;
};

exports.obtenerVentaPorId = async (id) => {
  const { rows } = await pool.query('SELECT * FROM venta WHERE id_venta = $1', [id]);
  return rows[0];
};

exports.obtenerVentasPorFecha = async (fecha) => {
  const ventasRes = await pool.query(
    `SELECT * FROM venta WHERE DATE(fecha) = $1 ORDER BY id_venta`, [fecha]
  );

  const ventas = ventasRes.rows;

  const ventasConDetalle = await Promise.all(ventas.map(async (venta) => {
    const detalleRes = await pool.query(
      `SELECT 
         dv.id_producto,
         dv.cantidad,
         dv.subtotal,
         p.nombre,
         p.tipo_mezcal,
         p.cantidad_mezcal_usada
       FROM detalle_venta dv
       JOIN producto p ON dv.id_producto = p.id_producto
       WHERE dv.id_venta = $1`,
      [venta.id_venta]
    );

    return {
      ...venta,
      detalle: detalleRes.rows
    };
  }));

  return ventasConDetalle;
};


exports.reporteDiario = async (fecha) => {
  const result = await pool.query(
    `SELECT p.nombre, SUM(dv.cantidad) AS total_vendidos
     FROM detalle_venta dv
     JOIN producto p ON p.id_producto = dv.id_producto
     JOIN venta v ON v.id_venta = dv.id_venta
     WHERE DATE(v.fecha) = $1
     GROUP BY p.nombre`
    , [fecha]);
  return result.rows;
};

exports.reporteMensual = async (mes) => {
  const result = await pool.query(
    `SELECT p.nombre, SUM(dv.subtotal) AS total_vendido
     FROM detalle_venta dv
     JOIN producto p ON p.id_producto = dv.id_producto
     JOIN venta v ON v.id_venta = dv.id_venta
     WHERE TO_CHAR(v.fecha, 'YYYY-MM') = $1
     GROUP BY p.nombre`
    , [mes]);
  return result.rows;
};
