const express = require("express");
const router = express.Router();
const {
  crearTransaccion,
  obtenerTransacciones,
  actualizarTransaccion,
  eliminarTransaccion,
} = require("../controllers/transaccionController");

const transaccionController = require('../controllers/transaccionController');
const { verificarToken } = require('../middleware/auth');

router.post("/crear", crearTransaccion);

router.get("/obtener", obtenerTransacciones);

router.put("/actualizar/:id", actualizarTransaccion);

router.delete("/eliminar/:id", eliminarTransaccion);

router.get('/balance/:usuarioId', transaccionController.obtenerBalance);

module.exports = router;
