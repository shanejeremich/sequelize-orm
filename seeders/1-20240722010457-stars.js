"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      const galaxies = await queryInterface.sequelize.query(`SELECT id, name FROM \`Galaxies\`;`, {
        type: Sequelize.QueryTypes.SELECT,
      });

      await queryInterface.bulkInsert(
        `Stars`,
        [
          {
            name: "Sun",
            galaxyId: 1,
            size: 1391016,
            description: "The star at the center of the Solar System.",
            imageUrl: "/uploads/stars/sun.jpg",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "Sirius",
            galaxyId: 1,
            size: 236695,
            description: "The brightest star in Earth's night sky.",
            imageUrl: "/uploads/stars/sirius.jpg",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "Alpha Centauri",
            galaxyId: 1,
            size: 173840,
            description: "The closest star system to the Solar System.",
            imageUrl: "/uploads/stars/alpha-centauri.webp",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "Betelgeuse",
            galaxyId: 1,
            size: 1172411168,
            description: "A red supergiant star in the constellation of Orion.",
            imageUrl: "/uploads/stars/betelgeuse.jpeg",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "Vega",
            galaxyId: 1,
            size: 383260,
            description:
              "The fifth-brightest star in the night sky and the second-brightest star in the northern celestial hemisphere.",
            imageUrl: "/uploads/stars/vega.jpg",
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
