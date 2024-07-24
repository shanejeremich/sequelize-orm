"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const stars = await queryInterface.sequelize.query(`SELECT id, name FROM \`Stars\`;`, {
      type: Sequelize.QueryTypes.SELECT,
    });

    const planets = await queryInterface.sequelize.query(`SELECT id, name FROM \`Planets\`;`, {
      type: Sequelize.QueryTypes.SELECT,
    });

    const starMap = new Map(stars.map(star => [star.name, star.id]));

    const planetMap = new Map(planets.map(planet => [planet.name, planet.id]));

    // Prepare data for the join table (starsPlanets)
    const starsPlanets = [
      {
        planetId: planetMap.get("Earth"),
        starId: starMap.get("Sun"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        planetId: planetMap.get("Mars"),
        starId: starMap.get("Sun"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        planetId: planetMap.get("Jupiter"),
        starId: starMap.get("Sun"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        planetId: planetMap.get("Saturn"),
        starId: starMap.get("Sun"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        planetId: planetMap.get("Venus"),
        starId: starMap.get("Sun"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    // Seed the join table
    await queryInterface.bulkInsert("StarsPlanets", starsPlanets, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("StarsPlanets", null, {});
    await queryInterface.sequelize.query("ALTER TABLE `StarsPlanets` AUTO_INCREMENT = 1;");
  },
};
