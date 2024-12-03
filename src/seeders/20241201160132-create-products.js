'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [{
      name: 'medias de wolverine',
      description: 'medias de wolverine para combinar con deadpool',
      price: 2500,
      stock: 10,
      categoryId: 1,
      subcategoryId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'medias de deadpool',
      description: 'medias de deadpool para combinar con wolverine',
      price: 2500,
      stock: 5,
      categoryId: 1,
      subcategoryId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'medias adidas blancas',
      description: 'medias deportivas adidas blancas con detalles negros',
      price: 3500,
      stock: 8,
      categoryId: 1,
      subcategoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'medias nike negras',
      description: 'medias deportivas nike negras con detalles blancos',
      price: 3500,
      stock: 12,
      categoryId: 1,
      subcategoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {returning: true})

    const products = await queryInterface.rawSelect('Products', {
      where: { name: { [Sequelize.Op.in]: ['medias de wolverine', 'medias de deadpool', 'medias adidas blancas', 'medias nike negras'] } }
    }, ['id'])

    if (!products) {
      throw new Error("No se encontraron productos.")
    }

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {})
  }
};
