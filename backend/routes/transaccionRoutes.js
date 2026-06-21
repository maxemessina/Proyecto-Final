const express = require("express");
const router = express.Router();
const {
  crearTransaccion,
  obtenerTransacciones,  
  obtenerTransaccionesFiltradas,
  actualizarTransaccion,
  eliminarTransaccion,
} = require("../controllers/transaccionController");

const transaccionController = require('../controllers/transaccionController');
const { verificarToken } = require('../middleware/auth');

router.post("/", crearTransaccion);

router.get("/filtrar", obtenerTransaccionesFiltradas);gi

router.get("/", obtenerTransacciones);

router.put("/:id", actualizarTransaccion);

router.delete("/:id", eliminarTransaccion);

router.get('/balance/:usuarioId', transaccionController.obtenerBalance);
router.post("/", crearTransaccion);

router.get("/", obtenerTransacciones);

router.put("/:id", actualizarTransaccion);

router.delete("/:id", eliminarTransaccion);

module.exports = router;
