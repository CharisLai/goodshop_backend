'use strict'
const bcrypt = require('bcryptjs')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{ // 一次新增三筆資料
      email: 'seller001@example.com',
      password: await bcrypt.hash('titaner', 10),
      is_admin: true,
      name: 'seller001',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      email: 'buyer001@example.com',
      password: await bcrypt.hash('titaner', 10),
      is_admin: false,
      name: 'buyer001',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      email: 'user1@example.com',
      password: await bcrypt.hash('12345678', 10),
      is_admin: false,
      name: 'user1',
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', {})
  }
}
