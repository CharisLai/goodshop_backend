'use strict'
const { Products, Order } = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const orders = await Order.findAll()
    const products = await Products.findAll()
    await queryInterface.bulkInsert('OrderItems',
      Array.from({ length: 10 }).map((item, index) => ({
        order_id: orders[Math.floor(Math.random() * 2)].id,
        product_id: products[Math.floor(Math.random() * 10)].id,
        price: Math.floor(Math.random() * 500) + 1,
        quantity: Math.floor(Math.random() * 10) + 1,
        created_at: new Date(),
        updated_at: new Date()
      })), {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('OrderItems', null, {})
  }
}
