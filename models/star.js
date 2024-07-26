"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Star extends Model {
    static associate(models) {
      models.Star.belongsTo(models.Galaxy, { foreignKey: "galaxyId" });
      models.Star.belongsToMany(models.Planet, {
        through: "StarsPlanets",
        as: "Planets",
        foreignKey: "starId",
      });
    }
  }
  Star.init(
    {
      galaxyId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      size: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Star",
    }
  );
  return Star;
};
