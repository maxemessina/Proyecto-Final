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

router.get("/filtrar", verificarToken, obtenerTransaccionesFiltradas);

router.get("/obtener", verificarToken, obtenerTransacciones);

router.put("/actualizar/:id", verificarToken, validarActualizarTransaccion, actualizarTransaccion);

router.delete("/eliminar/:id", verificarToken, eliminarTransaccion);

// Balance protegido: usa el token para identificar al usuario autenticado
router.get('/balance', verificarToken, transaccionController.obtenerBalance);

module.exports = router;
