'use strict'
const bcrypt = require('bcryptjs')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      email: 'seller001@example.com',
      password: await bcrypt.hash('titaner', 10),
      role: 'seller',
      name: 'seller001',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      email: 'buyer001@example.com',
      password: await bcrypt.hash('titaner', 10),
      role: 'buyer',
      name: 'buyer001',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      email: 'admin@example.com',
      password: await bcrypt.hash('12345678', 10),
      role: 'admin',
      name: 'user1',
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', {})
  }
}
