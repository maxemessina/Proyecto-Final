const express = require("express");
const router = express.Router();
const {
  crearTransaccion,
  obtenerTransacciones,  
  obtenerTransaccionesFiltradas,
  actualizarTransaccion,
  eliminarTransaccion,
} = require("../controllers/transaccionController");

const transaccionController = require("../controllers/transaccionController");

const { verificarToken } = require("../middleware/auth");

const {validarCrearTransaccion, validarActualizarTransaccion,} = require("../middleware/transaccionmiddleware");

router.post("/crear", verificarToken, validarCrearTransaccion, crearTransaccion);

router.get("/filtrar", obtenerTransaccionesFiltradas);

router.get("/obtener", verificarToken, obtenerTransacciones);

router.put("/actualizar/:id", verificarToken, validarActualizarTransaccion, actualizarTransaccion);

router.delete("/eliminar/:id", verificarToken, eliminarTransaccion);

router.get('/balance/:usuarioId', transaccionController.obtenerBalance);

module.exports = router;
