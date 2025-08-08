const pool = require('../db');

exports.obtenerReporteDiario = async (fecha) => {
  const ventas = await pool.query(
    `SELECT v.id_venta, v.total, v.metodo_pago,
            dv.id_producto, dv.cantidad, dv.subtotal,
            p.nombre, p.cantidad_mezcal_usada, p.tipo_mezcal
     FROM venta v
     JOIN detalle_venta dv ON v.id_venta = dv.id_venta
     JOIN producto p ON dv.id_producto = p.id_producto
     WHERE v.fecha = $1`,
    [fecha]
  );

  const total = await pool.query(
    `SELECT SUM(total) as total_ventas FROM venta WHERE fecha = $1`,
    [fecha]
  );

  const detalle = ventas.rows;

  let total_usado = 0;
  const consumo_por_mezcal = {};

  detalle.forEach(item => {
    const cantidad = item.cantidad || 0;
    const porUnidad = parseFloat(item.cantidad_mezcal_usada) || 0;
    const tipo = item.tipo_mezcal;

    if (tipo && porUnidad > 0) {
      const consumo = cantidad * porUnidad;
      total_usado += consumo;

      if (!consumo_por_mezcal[tipo]) consumo_por_mezcal[tipo] = 0;
      consumo_por_mezcal[tipo] += consumo;
    }
  });

  return {
    fecha,
    total_ventas: total.rows[0].total_ventas,
    total_usado: total_usado.toFixed(2),
    consumo_por_mezcal: Object.entries(consumo_por_mezcal).map(([tipo_mezcal, litros]) => ({
      tipo_mezcal,
      litros: litros.toFixed(2)
    })),
    productos_vendidos: detalle.reduce((acc, d) => acc + d.cantidad, 0),
    entradas: 0,
    detalle
  };
};


exports.obtenerReporteMensual = async (mes) => {
  const ventas = await pool.query(
    `SELECT * FROM venta WHERE TO_CHAR(fecha, 'YYYY-MM') = $1`, [mes]
  );

  const totalesPorProducto = await pool.query(
    `SELECT p.nombre, SUM(dv.subtotal) as total
     FROM detalle_venta dv
     JOIN producto p ON p.id_producto = dv.id_producto
     JOIN venta v ON v.id_venta = dv.id_venta
     WHERE TO_CHAR(v.fecha, 'YYYY-MM') = $1
     GROUP BY p.nombre`, [mes]
  );

  const ventasPorMetodo = await pool.query(
    `SELECT metodo_pago, SUM(total) as total
     FROM venta
     WHERE TO_CHAR(fecha, 'YYYY-MM') = $1
     GROUP BY metodo_pago`, [mes]
  );

  const consumoMezcal = await pool.query(
    `SELECT p.tipo_mezcal, SUM(dv.cantidad * p.cantidad_mezcal_usada) as litros
     FROM detalle_venta dv
     JOIN producto p ON p.id_producto = dv.id_producto
     JOIN venta v ON v.id_venta = dv.id_venta
     WHERE TO_CHAR(v.fecha, 'YYYY-MM') = $1 AND p.tipo_mezcal IS NOT NULL
     GROUP BY p.tipo_mezcal`, [mes]
  );

  return {
    mes,
    total_ventas: ventas.rows.reduce((acc, v) => acc + Number(v.total), 0),
    ventas_por_producto: totalesPorProducto.rows,
    ventas_por_metodo: ventasPorMetodo.rows,
    consumo_mezcal: consumoMezcal.rows
  };
};

exports.obtenerAvanceMezcal = async () => {
  const result = await pool.query(
    `SELECT p.nombre, SUM(dv.cantidad * p.cantidad_mezcal_usada) as total_usado
     FROM detalle_venta dv
     JOIN producto p ON p.id_producto = dv.id_producto
     GROUP BY p.nombre`
  );

  return result.rows;
};
