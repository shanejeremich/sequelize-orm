"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Galaxy extends Model {
    static associate(models) {
      models.Galaxy.hasMany(models.Star, { foreignKey: `galaxyId` });
    }
  }

  Galaxy.init(
    {
      name: DataTypes.STRING,
      size: DataTypes.INTEGER,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Galaxy",
    }
  );
  return Galaxy;
};
