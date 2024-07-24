"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Planet extends Model {
    static associate(models) {
      models.Planet.belongsToMany(models.Star, {
        through: "StarsPlanets",
        as: "Stars",
        foreignKey: "planetId",
      });
    }
  }
  Planet.init(
    {
      name: DataTypes.STRING,
      size: DataTypes.INTEGER,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Planet",
    }
  );
  return Planet;
};
