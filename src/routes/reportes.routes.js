const express = require('express');
const router = express.Router();
const reportesController = require('../controllers/reportes.controller');

// Reporte diario por fecha YYYY-MM-DD
router.get('/diario/:fecha', reportesController.reporteDiario);

// Reporte mensual por mes YYYY-MM
router.get('/mensual/:mes', reportesController.reporteMensual);

// Avance de consumo de mezcal
router.get('/mezcal', reportesController.reporteMezcal);

module.exports = router;