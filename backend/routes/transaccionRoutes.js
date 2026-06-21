const express = require("express");
const router = express.Router();
const {
  obtenerTransacciones,
  actualizarTransaccion,
  eliminarTransaccion,
} = require("../controllers/transaccionController");

router.post("/", crearTransaccion);

router.get("/", obtenerTransacciones);

router.put("/:id", actualizarTransaccion);

router.delete("/:id", eliminarTransaccion);

module.exports = router;
