'use strict'
const db = require('../models')
const User = db.User

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await User.findAll({ where: { role: 'buyer' } })

    await queryInterface.bulkInsert('Carts',
      Array.from({ length: 3 }).map((item, index) => ({
        user_id: users[Math.floor(Math.random() * users.length)].id,
        created_at: new Date(),
        updated_at: new Date()
      })), {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Carts', null, {})
  }
}
