'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Subcategories', [{
      name: '3/4',
      categoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
        name: 'soquetes',
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
    }], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Subcategories', null, {})
  }
}
