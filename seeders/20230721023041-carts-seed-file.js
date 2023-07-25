'use strict'
const db = require('../models')
const { User } = db

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await User.findAll({ where: { is_admin: false, is_seller: false } })

    await queryInterface.bulkInsert('Carts',
      Array.from({ length: 3 }).map((item, index) => ({
        user_id: users[index % users.length].id,
        created_at: new Date(),
        updated_at: new Date()
      })), {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Carts', null, {})
  }
}
