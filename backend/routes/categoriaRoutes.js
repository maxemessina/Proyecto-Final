const express = require('express');
const router = express.Router();

const {
  crearCategoria,
  obtenerCategorias
} = require('../controllers/categoriaController');

router.post('/crear', crearCategoria);
router.get('/obtener', obtenerCategorias);

module.exports = router;