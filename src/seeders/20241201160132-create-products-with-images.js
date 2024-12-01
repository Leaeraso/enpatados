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

    const images = [
      {url: 'https://d22fxaf9t8d39k.cloudfront.net/5a23374060f05ca7379ea2b999f942a25b3592e677f6c3cb03e6eea57f19d44797018.jpg', productId: products[0].id},
      {url: 'https://d22fxaf9t8d39k.cloudfront.net/a65bbbcac802c72486b27bd82867cc8e8c082f53371116076cb3014fc91b0f8897018.jpg', productId: products[0].id},
      {url: 'https://http2.mlstatic.com/D_NQ_NP_677291-MLA79676936567_092024-O.webp', productId: products[1].id},
      {url: 'https://http2.mlstatic.com/D_NQ_NP_795981-MLA79676102555_092024-O.webp', productId: products[1].id},
      {url: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/fc4e5c9b1dcc44cba13228105fd67781_9366/Medias_BTS_3_Pares_Blanco_JG3998_01_standard.jpg', productId: products[2].id},
      {url: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/c587afcc29824a2f9daaca2e5d27cd89_9366/Medias_BTS_3_Pares_Blanco_JD9597_01_standard.jpg', productId: products[2].id},
      {url: 'https://nikearprod.vtexassets.com/arquivos/ids/716787-1200-1200?width=1200&height=1200&aspect=true', productId: products[3].id},
      {url: 'https://nikearprod.vtexassets.com/arquivos/ids/717016-1200-1200?width=1200&height=1200&aspect=true', productId: products[3].id}
    ]

    await queryInterface.bulkInsert('Images', images, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {})
    await queryInterface.bulkDelete('Images', null, {})
  }
};
