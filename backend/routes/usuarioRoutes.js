const express = require('express');
const router = express.Router();
const { register, login, perfil } = require('../controllers/usuarioController');
const { verificarToken } = require('../middleware/auth'); 

// POST /api/auth/register - Registro de usuario (pública)
router.post('/register', register);

// POST /api/auth/login - Inicio de sesión (pública)
router.post('/login', login);

// GET /api/auth/perfil - Obtener perfil (protegida)
// router.get('/perfil', verificarToken, perfil);
router.get('/perfil/:id', verificarToken, perfil);
// El :id se mantiene por compatibilidad (útil para pruebas en Postman),
// pero si el token es válido, el controller prioriza req.user.id sobre req.params.id.

module.exports = router;