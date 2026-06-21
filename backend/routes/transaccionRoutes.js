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

router.post("/", crearTransaccion);

router.get("/", obtenerTransacciones);

router.put("/:id", actualizarTransaccion);

router.delete("/:id", eliminarTransaccion);

router.get('/balance/:usuarioId', transaccionController.obtenerBalance);

module.exports = router;