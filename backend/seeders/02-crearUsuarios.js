'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    const password1 = await bcrypt.hash('123456', 10);
    const password2 = await bcrypt.hash('123456', 10);

    await queryInterface.bulkInsert('usuarios', [
      {
        nombre: 'John Doe',
        email: 'john.doe@mail.com',
        password: password1,
        created_at: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Jane Doe',
        email: 'jane.doe@mail.com',
        password: password2,
        created_at: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('usuarios', null, {});
  }
};