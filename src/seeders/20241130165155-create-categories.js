'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      {
        name: 'Medias',
        description: 'Variedad de medias para todas las ocasiones.',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M13 3v6l4.798 5.142a4 4 0 0 1-5.441 5.86l-6.736-6.41A2 2 0 0 1 5 12.141V3z"/><path d="M7.895 15.768C8.603 15.047 9 14.091 9 13a4 4 0 0 0-4-4"/></g></svg>`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Lentes',
        description: 'Lentes de sol y para vista con estilo.',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M8 3a1 1 0 1 1 0 2H6.743l-2.4 8H10a1 1 0 0 1 1 1v1h2v-1a1 1 0 0 1 1-1h5.656l-2.4-8H16a1 1 0 0 1-.993-.883L15 4a1 1 0 0 1 1-1h2a1 1 0 0 1 .958.713l3.01 10.036l.022.112l.008.08L22 16.5a4.5 4.5 0 0 1-8.972.5h-2.056A4.5 4.5 0 0 1 2 16.5v-2.518l.004-.071l.014-.103l.018-.076l3.006-10.02A1 1 0 0 1 6 3z"/></svg>`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
