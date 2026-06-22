// seeders/XXXXXX-crearTransacciones.js
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('transacciones', [
      {
        usuario_id: 1,
        categoria_id: 1, // Sueldo
        monto: 150000.00,
        descripcion: 'Sueldo de junio',
        fecha: new Date('2026-06-01'),
        created_at: new Date(),
        updatedAt: new Date()
      },
      {
        usuario_id: 1,
        categoria_id: 2, // Comida
        monto: 8500.00,
        descripcion: 'Super del mes',
        fecha: new Date('2026-06-05'),
        created_at: new Date(),
        updatedAt: new Date()
      },
      {
        usuario_id: 1,
        categoria_id: 3, // Transporte
        monto: 3200.00,
        descripcion: 'SUBE',
        fecha: new Date('2026-06-10'),
        created_at: new Date(),
        updatedAt: new Date()
      },
      {
        usuario_id: 2,
        categoria_id: 1, // Sueldo
        monto: 200000.00,
        descripcion: 'Sueldo de junio',
        fecha: new Date('2026-06-01'),
        created_at: new Date(),
        updatedAt: new Date()
      },
      {
        usuario_id: 2,
        categoria_id: 4, // Actividades
        monto: 12000.00,
        descripcion: 'Gimnasio',
        fecha: new Date('2026-06-08'),
        created_at: new Date(),
        updatedAt: new Date()
      },
      {
        usuario_id: 2,
        categoria_id: 5, // Ropa
        monto: 25000.00,
        descripcion: 'Zapatillas',
        fecha: new Date('2026-06-15'),
        created_at: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('transacciones', null, {});
  }
};