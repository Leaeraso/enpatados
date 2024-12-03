'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      {
        name: 'Medias',
        description: 'Variedad de medias para todas las ocasiones.',
        icon: 'tabler:sock',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Lentes',
        description: 'Lentes de sol y para vista con estilo.',
        icon: 'tabler:sunglasses',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
