'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Images', [
      {
        url: 'https://photos.google.com/share/AF1QipNcqAZkROmlLPjmZNODKAQ6SZK0ixt51Dl-0ZMtmOsJkWG7K5YQp78s9Sz9ir-GGg/photo/AF1QipNBOEwYAzCw2Y4I9w06K2VQU0AW6g5q71bOHK1s?key=ZkZITUJmQVNUTjZ2MTRHdURSZDR4MXduRGlkMkJB',
        productId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        url: 'https://photos.google.com/share/AF1QipNcqAZkROmlLPjmZNODKAQ6SZK0ixt51Dl-0ZMtmOsJkWG7K5YQp78s9Sz9ir-GGg/photo/AF1QipNbBDc9XVDZ-Dq4csinbVwWEehiK5-RMq0ttrFF?key=ZkZITUJmQVNUTjZ2MTRHdURSZDR4MXduRGlkMkJB',
        productId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        url: 'https://photos.google.com/share/AF1QipNcqAZkROmlLPjmZNODKAQ6SZK0ixt51Dl-0ZMtmOsJkWG7K5YQp78s9Sz9ir-GGg/photo/AF1QipMIliB9FjXANH77hf_cnXTu9pdpSoio45RI2ERP?key=ZkZITUJmQVNUTjZ2MTRHdURSZDR4MXduRGlkMkJB',
        productId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        url: 'https://photos.google.com/share/AF1QipNcqAZkROmlLPjmZNODKAQ6SZK0ixt51Dl-0ZMtmOsJkWG7K5YQp78s9Sz9ir-GGg/photo/AF1QipPUvWNRh1tXH9ZmEfaWgSlqPzCfMvhsgZ0e44fv?key=ZkZITUJmQVNUTjZ2MTRHdURSZDR4MXduRGlkMkJB',
        productId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        url: 'https://photos.google.com/share/AF1QipNcqAZkROmlLPjmZNODKAQ6SZK0ixt51Dl-0ZMtmOsJkWG7K5YQp78s9Sz9ir-GGg/photo/AF1QipNN-ctGb58s7mdzpbSnRCOgd22excpK3mUksI4u?key=ZkZITUJmQVNUTjZ2MTRHdURSZDR4MXduRGlkMkJB',
        productId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        url: 'https://photos.google.com/share/AF1QipNcqAZkROmlLPjmZNODKAQ6SZK0ixt51Dl-0ZMtmOsJkWG7K5YQp78s9Sz9ir-GGg/photo/AF1QipPJhVuXnAAT8tz0tFa9L2W3URBjp5AFNSt6bB9l?key=ZkZITUJmQVNUTjZ2MTRHdURSZDR4MXduRGlkMkJB',
        productId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        url: 'https://photos.google.com/share/AF1QipNcqAZkROmlLPjmZNODKAQ6SZK0ixt51Dl-0ZMtmOsJkWG7K5YQp78s9Sz9ir-GGg/photo/AF1QipNk-fTacD0jFJ51p5Lv0aGD-OiHe6yh2PexD6Ai?key=ZkZITUJmQVNUTjZ2MTRHdURSZDR4MXduRGlkMkJB',
        productId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Images', null, {});
  }
};
