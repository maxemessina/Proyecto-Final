const express = require('express');
const router = express.Router();
const { register, login, perfil } = require('../controllers/usuarioController');

// const { verificarToken } = require('../middleware/auth'); 
// comentado por ahora, falta JWT

// POST /api/auth/register - Registro de usuario (pública)
router.post('/register', register);

// POST /api/auth/login - Inicio de sesión (pública)
router.post('/login', login);

// GET /api/auth/perfil - Obtener perfil (protegida)
// router.get('/perfil', verificarToken, perfil);
router.get('/perfil/:id', perfil); // por ahora sin JWT, se pasa el ID del usuario en la URL

module.exports = router;