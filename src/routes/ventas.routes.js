const express = require('express');
const router = express.Router();
const ventasController = require('../controllers/ventas.controller');

router.post('/', ventasController.crearVenta);
router.get('/', ventasController.obtenerVentas);
router.get('/:id', ventasController.obtenerVentaPorId);
router.get('/fecha/:fecha', ventasController.obtenerVentasPorFecha);
router.get('/reporte/diario/:fecha', ventasController.reporteDiario);
router.get('/reporte/mensual/:mes', ventasController.reporteMensual);

module.exports = router;
