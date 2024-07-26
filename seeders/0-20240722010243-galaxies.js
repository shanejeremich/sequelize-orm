"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkInsert(
        `Galaxies`,
        [
          {
            name: "Milky Way",
            size: 105700,
            description: "A galaxy containing our Solar System.",
            imageUrl: "/uploads/galaxies/milky-way.webp",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "Andromeda",
            size: 220000,
            description: "The nearest spiral galaxy to the Milky Way.",
            imageUrl: "/uploads/galaxies/andromeda.jpg",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "Triangulum",
            size: 60000,
            description: "The third-largest galaxy in the Local Group.",
            imageUrl: "/uploads/galaxies/triangulum.jpg",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "Magellanic Clouds",
            size: 14000,
            description: "A duo of irregular dwarf galaxies visible from the southern hemisphere.",
            imageUrl: "/uploads/galaxies/magellanic-clouds.jpg",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "Whirlpool",
            size: 76000,
            description: "A classic spiral galaxy, notable for its interaction with NGC 5195.",
            imageUrl: "/uploads/galaxies/whirlpool.webp",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {}
      );
    } catch (err) {
      console.error("Error seeding galaxies:", err);
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkDelete("Galaxies", null, {});
      await queryInterface.sequelize.query("ALTER TABLE `Galaxies` AUTO_INCREMENT = 1;");
    } catch (err) {
      console.error("Error reverting galaxies seeding:", err);
    }
  },
};
