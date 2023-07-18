'use strict'
const { faker } = require('@faker-js/faker')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Goods',
      Array.from({ length: 50 }, () => ({
        name: faker.commerce.product(),
        price: faker.commerce.price({ min: 50, max: 10000, dec: 0, symbol: 'NT$' }),
        quantity: faker.number.int(100),
        description: faker.commerce.productDescription(),
        image: `https://loremflickr.com/320/240/product/?random=${Math.random() * 100}`,
        created_at: new Date(),
        updated_at: new Date()
      }))
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Goods', {})
  }
}
