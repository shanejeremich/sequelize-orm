"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    queryInterface.addColumn(`Stars`, `galaxyId`, {
      type: Sequelize.INTEGER,
      defaultValue: null,
      allowNull: true,
      references: {
        model: `Galaxies`,
        key: `id`,
      },
      onUpdate: `CASCADE`,
      onDelete: `SET NULL`,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    queryInterface.removeColumn(`Stars`, `galaxyId`);
  },
};
