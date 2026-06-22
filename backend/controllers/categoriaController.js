const { Categoria } = require('../models');

const crearCategoria = async (req, res) => {
  try {
    const { nombre, tipo } = req.body;

    if (tipo !== 'ingreso' && tipo !== 'egreso') {
      return res.status(400).json({
        error: 'El tipo debe ser "ingreso" o "egreso"'
      });
    }

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