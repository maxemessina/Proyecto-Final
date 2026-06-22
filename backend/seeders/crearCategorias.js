'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categorias', [
      {
        nombre: 'Sueldo',
        tipo: 'ingreso',
        created_at: new Date()
      },
      {
        nombre: 'Comida',
        tipo: 'egreso',
        created_at: new Date()
      },
      {
        nombre: 'Transporte',
        tipo: 'egreso',
        created_at: new Date()
      },
      {
        nombre: 'Actividades',
        tipo: 'egreso',
        created_at: new Date()
      },
      {
        nombre: 'Ropa',
        tipo: 'egreso',
        created_at: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categorias', null, {});
  }
};