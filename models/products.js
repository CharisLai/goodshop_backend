'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Products.belongsToMany(models.Cart, {
        through: models.CartItem,
        foreignKey: 'ProductId',
        as: 'Carts'
      })
      Products.belongsToMany(models.Order, {
        through: models.OrderItem,
        foreignKey: 'ProductId',
        as: 'Orders'
      })
    }
  };
  Products.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.STRING,
    image: DataTypes.STRING,
    deleted_at: DataTypes.INTEGER,
    inventory: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Products',
    tableName: 'Products',
    underscored: true
  })
  return Products
}
