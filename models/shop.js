"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Shop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Shop.hasMany(models.User, {
        foreignKey: {
          name: "shopId",
          allowNull: false,
        },
      });
      Shop.belongsTo(models.Product, {
        foreignKey: {
          name: "productId",
          allowNull: false,
        },
      });
    }
  }
  Shop.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Shop",
    }
  );
  return Shop;
};
