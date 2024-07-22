"use strict";

const planet = require("../models/planet");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Stars",
      [
        {
          galaxyId: 1,
          name: "Sun",
          size: 1391016,
          description: "The star at the center of the Solar System.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          galaxyId: 1,
          name: "Sirius",
          size: 236695,
          description: "The brightest star in Earth's night sky.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          galaxyId: 1,
          name: "Alpha Centauri",
          size: 173840,
          description: "The closest star system to the Solar System.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          galaxyId: 1,
          name: "Betelgeuse",
          size: 1172411168,
          description: "A red supergiant star in the constellation of Orion.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          galaxyId: 1,
          name: "Vega",
          size: 383260,
          description:
            "The fifth-brightest star in the night sky and the second-brightest star in the northern celestial hemisphere.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Stars", null, {});

    // Reset the auto-increment value for MySQL
    await queryInterface.sequelize.query("ALTER TABLE `Stars` AUTO_INCREMENT = 1;");
  },
};
