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
      "Planets",
      [
        {
          starId: 1,
          galaxyId: 1,
          name: "Earth",
          size: 12742,
          description: "The only planet known to support life.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          starId: 1,
          galaxyId: 1,
          name: "Mars",
          size: 6779,
          description: "Often called the Red Planet due to its reddish appearance.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          starId: 1,
          galaxyId: 1,
          name: "Jupiter",
          size: 139820,
          description: "The largest planet in our solar system.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          starId: 1,
          galaxyId: 1,
          name: "Saturn",
          size: 116460,
          description: "Known for its prominent ring system.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          starId: 1,
          galaxyId: 1,
          name: "Venus",
          size: 12104,
          description:
            'The second planet from the Sun, it is sometimes referred to as Earth\'s "sister planet" due to their similar size, mass, and proximity to the Sun.',
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
    await queryInterface.bulkDelete("Planets", null, {});

    // Reset the auto-increment value for MySQL
    await queryInterface.sequelize.query("ALTER TABLE `Planets` AUTO_INCREMENT = 1;");
  },
};
