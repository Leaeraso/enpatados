'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('OrderProduct', [
      {
        orderId: 1,
        productId: 1,
        quantity: 2,
        subtotal: 5000,
      },
      {
        orderId: 1,
        productId: 2,
        quantity: 1,
        subtotal: 2500,
      },
      {
        orderId: 2,  
        productId: 3, 
        quantity: 3,
        subtotal: 10500,
      },
      {
        orderId: 2,
        productId: 4, 
        quantity: 2,
        subtotal: 7000,
      },
      {
        orderId: 3,
        productId: 1,
        quantity: 1,
        subtotal: 2500,
      },
      {
        orderId: 3,
        productId: 2,
        quantity: 1,
        subtotal: 2500,
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('OrderProduct', null, {});
  }
};
