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

const editarCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, tipo } = req.body;

    const categoria = await Categoria.findByPk(id);

    if (!categoria) {
      return res.status(404).json({
        error: "Categoría no encontrada"
      });
    }

    await categoria.update({
      nombre,
      tipo
    });

    res.json({
      message: "Categoría actualizada correctamente",
      categoria
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error al actualizar categoría"
    });
  }
};

const eliminarCategoria = async (req, res) => {
  try {

    const { id } = req.params;

    const categoria = await Categoria.findByPk(id);

    if (!categoria) {
      return res.status(404).json({
        error: "Categoría no encontrada"
      });
    }

    await categoria.destroy();

    res.json({
      message: "Categoría eliminada correctamente"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Error al eliminar categoría"
    });

  }
};

module.exports = {
  crearCategoria,
  obtenerCategorias,
  editarCategoria,
  eliminarCategoria
};