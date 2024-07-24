"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StarsPlanets extends Model {
    static associate(models) {
      this.belongsTo(models.Star, { foreignKey: "starId" });
      this.belongsTo(models.Planet, { foreignKey: "planetId" });
    }
  }
  StarsPlanets.init(
    {
      starId: DataTypes.INTEGER,
      planetId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "StarsPlanets",
      timestamps: false,
    }
  );
  return StarsPlanets;
};
