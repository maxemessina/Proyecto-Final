const express = require('express');
const router = express.Router();
const usuarioRoutes = require('./usuarioRoutes');
const categoriaRoutes = require('./categoriaRoutes');
const transaccionRoutes = require('./transaccionRoutes');

// Ruta de prueba
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'API funcionando correctamente',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Rutas de usuario
router.use('/usuario', usuarioRoutes);

// Rutas de categoría
router.use('/categoria', categoriaRoutes);

// Rutas de transacción
router.use('/transaccion', transaccionRoutes);

// Ruta de ejemplo
router.get('/test', (req, res) => {
  res.json({
    message: 'Endpoint de prueba',
    data: {
      backend: 'Express',
      database: 'PostgreSQL',
      orm: 'Sequelize'
    }
  });
});

module.exports = router;