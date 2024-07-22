"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Star extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      // define association here
      models.Star.belongsTo(models.Galaxy, { foreignKey: "galaxyId" });
      models.Star.belongsToMany(models.Planet, { through: "StarsPlanets", as: "Planets" });
    }
  }
  Star.init(
    {
      galaxyId: DataTypes.INTEGER,
      planetId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      size: DataTypes.INTEGER,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Star",
    }
  );
  return Star;
};
