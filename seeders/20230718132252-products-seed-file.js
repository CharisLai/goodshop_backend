'use strict'
const { faker } = require('@faker-js/faker')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Products',
      Array.from({ length: 50 }, () => ({
        name: faker.commerce.product(),
        price: faker.number.int({ min: 100, max: 2999 }),
        description: faker.commerce.productDescription(),
        image: `https://loremflickr.com/320/240/product/?random=${Math.random() * 100}`,
        created_at: new Date(),
        updated_at: new Date(),
        inventory: faker.number.int({ min: 1, max: 5 })
      })), {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', {})
  }
}
