'use strict'
// use database
const { Products, Cart } = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const product = await Products.findAll()
    const cart = await Cart.findAll()

    await queryInterface.bulkInsert('CartItems',
      Array.from({ length: 10 }).map((item, index) => ({
        cart_id: cart[Math.floor(Math.random() * 3)].id,
        product_id: product[Math.floor(Math.random() * 10)].id,
        quantity: Math.floor(Math.random() * 5) + 1,
        created_at: new Date(),
        updated_at: new Date()
      })), {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('CartItems', null, {})
  }
}
