"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      // Retrieve all galaxies
      const galaxies = await queryInterface.sequelize.query(`SELECT id, name FROM \`Galaxies\`;`, {
        type: Sequelize.QueryTypes.SELECT,
      });

      // // Convert array of galaxies to a map for easier access
      // const galaxyMap = new Map(galaxies.map(galaxy => [galaxy.name, galaxy.id]));

      // Define star-galaxy relationships
      await queryInterface.bulkInsert(
        `Stars`,
        [
          {
            name: "Sun",
            galaxyId: 1,
            size: 1391016,
            description: "The star at the center of the Solar System.",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "Sirius",
            galaxyId: 1,
            size: 236695,
            description: "The brightest star in Earth's night sky.",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "Alpha Centauri",
            galaxyId: 1,
            size: 173840,
            description: "The closest star system to the Solar System.",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "Betelgeuse",
            galaxyId: 1,
            size: 1172411168,
            description: "A red supergiant star in the constellation of Orion.",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "Vega",
            galaxyId: 1,
            size: 383260,
            description:
              "The fifth-brightest star in the night sky and the second-brightest star in the northern celestial hemisphere.",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {}
      );
    } catch (err) {
      console.error("Error seeding stars:", err);
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkDelete("Stars", null, {});
      await queryInterface.sequelize.query("ALTER TABLE `Stars` AUTO_INCREMENT = 1;");
    } catch (err) {
      console.error("Error reverting stars seeding:", err);
    }
  },
};
