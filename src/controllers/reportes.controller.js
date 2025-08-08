const reportesModel = require('../models/reportes.model');

exports.reporteDiario = async (req, res) => {
  try {
    const fecha = req.params.fecha;
    const data = await reportesModel.obtenerReporteDiario(fecha);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.reporteMensual = async (req, res) => {
  try {
    const mes = req.params.mes; // Formato: YYYY-MM
    const data = await reportesModel.obtenerReporteMensual(mes);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.reporteMezcal = async (req, res) => {
  try {
    const data = await reportesModel.obtenerAvanceMezcal();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
