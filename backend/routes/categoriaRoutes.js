const express = require('express');
const router = express.Router();

const {
  crearCategoria,
  obtenerCategorias
} = require('../controllers/categoriaController');

// POST /api/categoria
router.post('/crear', crearCategoria);

// GET /api/categoria
router.get('/obtener', obtenerCategorias);

module.exports = router;