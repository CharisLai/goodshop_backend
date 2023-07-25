'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.addColumn('Users', 'is_admin', {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      })
      await queryInterface.addColumn('Users', 'is_seller', {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      })
    } catch (error) {
      console.log(error)
      throw error
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.removeColumn('Users', 'is_admin')
      await queryInterface.removeColumn('Users', 'is_seller')
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
