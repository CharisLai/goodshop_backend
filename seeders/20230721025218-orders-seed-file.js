'use strict'
const { faker } = require('@faker-js/faker')
const { User } = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await User.findAll({ where: { role: 'buyer' } })
    await queryInterface.bulkInsert('Orders',
      Array.from({ length: 2 }).map((item, index) => ({
        user_id: users[Math.floor(Math.random() * users.length)].id,
        name: faker.person.fullName(),
        tel: faker.phone.number(),
        address: faker.location.streetAddress(),
        amount: faker.finance.amount({ dec: 0 }),
        sn: faker.string.numeric(10),
        shipping_status: Math.floor(Math.random() * 1),
        payment_status: Math.floor(Math.random() * 1),
        created_at: new Date(),
        updated_at: new Date()
      })), {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Orders', null, {})
  }
}
