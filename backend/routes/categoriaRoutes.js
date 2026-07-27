const express = require('express');
const router = express.Router();

const {
  crearCategoria,
  obtenerCategorias,
  editarCategoria,
  eliminarCategoria
} = require('../controllers/categoriaController');

router.post('/crear', crearCategoria);
router.get('/obtener', obtenerCategorias);
router.put('/editar/:id', editarCategoria);
router.delete('/eliminar/:id', eliminarCategoria);

module.exports = router;