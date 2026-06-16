const { Categoria } = require('../models');

// POST /api/categoria
const crearCategoria = async (req, res) => {
  try {
    const { nombre, tipo } = req.body;

    const existente = await Categoria.findOne({
      where: { nombre }
    });

    if (existente) {
      return res.status(400).json({
        error: 'La categoría ya existe'
      });
    }

    const categoria = await Categoria.create({
      nombre,
      tipo
    });

    res.status(201).json({
      message: 'Categoría creada exitosamente',
      categoria
    });
  } catch (error) {
    console.error('Error al crear categoría:', error);
    res.status(500).json({
      error: 'Error al crear categoría'
    });
  }
};

// GET /api/categoria
const obtenerCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.findAll();

    res.json(categorias);
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    res.status(500).json({
      error: 'Error al obtener categorías'
    });
  }
};

module.exports = {
  crearCategoria,
  obtenerCategorias
};