"use strict";
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [
      {
        name: "Leandro",
        surname: "Eraso",
        email: "leaeraso@gmail.com",
        password: "leae010903",
        dob: "2003-09-01",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "John",
        surname: "Doe",
        email: "john.doe@example.com",
        password: "password123",
        dob: "1990-01-01",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Jane",
        surname: "Smith",
        email: "jane.smith@example.com",
        password: "password123",
        dob: "1992-05-12",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Carlos",
        surname: "Gomez",
        email: "carlos.gomez@example.com",
        password: "password123",
        dob: "1985-09-21",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Maria",
        surname: "Lopez",
        email: "maria.lopez@example.com",
        password: "password123",
        dob: "1995-11-30",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Emily",
        surname: "Davis",
        email: "emily.davis@example.com",
        password: "password123",
        dob: "1998-03-17",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Luis",
        surname: "Martinez",
        email: "luis.martinez@example.com",
        password: "password123",
        dob: "1980-07-14",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Sophia",
        surname: "Brown",
        email: "sophia.brown@example.com",
        password: "password123",
        dob: "2000-12-05",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Michael",
        surname: "Clark",
        email: "michael.clark@example.com",
        password: "password123",
        dob: "1988-06-23",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Laura",
        surname: "Garcia",
        email: "laura.garcia@example.com",
        password: "password123",
        dob: "1993-10-11",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "David",
        surname: "Wilson",
        email: "david.wilson@example.com",
        password: "password123",
        dob: "1999-02-08",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    for (let user of users) {
      user.password = await bcrypt.hash(user.password, 10);
    }

    await queryInterface.bulkInsert("Users", users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
