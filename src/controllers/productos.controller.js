const productosModel = require('../models/productos.model');

exports.crearProducto = async (req, res) => {
  try {
    const result = await productosModel.insertarProducto(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerProductos = async (req, res) => {
  try {
    const result = await productosModel.obtenerProductos();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerProductoPorId = async (req, res) => {
  try {
    const result = await productosModel.obtenerProductoPorId(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.actualizarProducto = async (req, res) => {
  try {
    const result = await productosModel.actualizarProducto(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.eliminarProducto = async (req, res) => {
  try {
    const result = await productosModel.eliminarProducto(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
