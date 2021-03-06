'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PlantacaoPlanta', {
      planta_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        references: { model: 'Planta', key: 'id' }
      },
      plantacao_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        references: { model: 'Plantacao', key: 'id' }
      },
      doenca_id: {
        allowNull: true,
        type: Sequelize.UUID
      },
      doenca_createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PlantacaoPlanta')
  }
}
