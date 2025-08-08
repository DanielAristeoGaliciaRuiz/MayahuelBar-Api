const ventasModel = require('../models/ventas.model');

exports.crearVenta = async (req, res) => {
  try {
    const result = await ventasModel.insertarVenta(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerVentas = async (req, res) => {
  try {
    const result = await ventasModel.obtenerVentas();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerVentaPorId = async (req, res) => {
  try {
    const result = await ventasModel.obtenerVentaPorId(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerVentasPorFecha = async (req, res) => {
  try {
    const result = await ventasModel.obtenerVentasPorFecha(req.params.fecha);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.reporteDiario = async (req, res) => {
  try {
    const result = await ventasModel.reporteDiario(req.params.fecha);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.reporteMensual = async (req, res) => {
  try {
    const result = await ventasModel.reporteMensual(req.params.mes);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
