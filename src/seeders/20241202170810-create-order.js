'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Orders', [
      {
        date: new Date(),
        total: 7500,
        status: 'pendiente',
        userId: 4,
        discount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        date: new Date(),
        total: 17500,
        status: 'pagado',
        userId: 3,
        discount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        date: new Date(),
        total: 5000,
        status: 'cancelado',
        userId: 5,
        discount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {returning: true})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Orders', null, {})
  }
};
