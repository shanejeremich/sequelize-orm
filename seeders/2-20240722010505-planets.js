"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkInsert(
        `Planets`,
        [
          {
            name: "Earth",
            starId: 1,
            size: 12742,
            description: "The only planet known to support life.",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "Mars",
            starId: 1,
            size: 6779,
            description: "Often called the Red Planet due to its reddish appearance.",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "Jupiter",
            starId: 1,
            size: 139820,
            description: "The largest planet in our solar system.",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "Saturn",
            starId: 1,
            size: 116460,
            description: "Known for its prominent ring system.",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "Venus",
            starId: 1,
            size: 12104,
            description:
              'The second planet from the Sun, it is sometimes referred to as Earth\'s "sister planet" due to their similar size, mass, and proximity to the Sun.',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {}
      );
    } catch (err) {
      console.error("Error seeding planets and their relationships:", err);
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkDelete("Planets", null, {});
      await queryInterface.sequelize.query("ALTER TABLE `Planets` AUTO_INCREMENT = 1;");
    } catch (err) {
      console.error("Error reverting planets seeding:", err);
    }
  },
};
