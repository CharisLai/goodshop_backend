'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Payment.belongsTo(models.Order)
    }
  };
  Payment.init({
    order_id: DataTypes.INTEGER,
    payment_method: DataTypes.STRING,
    isSuccess: DataTypes.BOOLEAN,
    failure_message: DataTypes.TEXT,
    payTime: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Payment',
    tableName: 'Payments',
    underscored: true
  })
  return Payment
}
