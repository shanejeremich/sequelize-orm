"use strict";

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
      "Galaxies",
      [
        {
          name: "Milky Way",
          size: 105700,
          description: "A galaxy containing our Solar System.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Andromeda",
          size: 220000,
          description: "The nearest spiral galaxy to the Milky Way.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Triangulum",
          size: 60000,
          description: "The third-largest galaxy in the Local Group.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Magellanic Clouds",
          size: 14000,
          description: "A duo of irregular dwarf galaxies visible from the southern hemisphere.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Whirlpool",
          size: 76000,
          description: "A classic spiral galaxy, notable for its interaction with NGC 5195.",
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
    await queryInterface.bulkDelete("Galaxies", null, {});

    // Reset the auto-increment value for MySQL
    await queryInterface.sequelize.query("ALTER TABLE `Galaxies` AUTO_INCREMENT = 1;");
  },
};
