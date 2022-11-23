'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      username: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      role: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      email: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      password: {
        allowNull: false,
        type: Sequelize.INTEGER,
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  },
};
