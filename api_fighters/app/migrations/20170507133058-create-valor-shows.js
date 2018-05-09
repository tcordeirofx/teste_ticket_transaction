'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('valor_shows', {
      id: {
        allowNull: false, 
        autoIncrement: true, 
        primaryKey: true, 
        type: Sequelize.INTEGER
      },
      valor: {
        type: Sequelize.DECIMAL(10, 2)
      },
      id_show: {
        allowNull: false, 
        type: Sequelize.INTEGER
      }
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('valor_shows');
  }
};
