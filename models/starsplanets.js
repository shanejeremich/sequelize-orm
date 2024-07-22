"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StarsPlanets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      // define association here
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
