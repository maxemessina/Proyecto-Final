const express = require('express');
const router = express.Router();

const {
  crearCategoria,
  obtenerCategorias
} = require('../controllers/categoriaController');

// POST /api/categoria
router.post('/', crearCategoria);

// GET /api/categoria
router.get('/', obtenerCategorias);

module.exports = router;