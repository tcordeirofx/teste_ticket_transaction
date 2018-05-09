'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('ticket_shows', {
      id: {
        allowNull: false, 
        autoIncrement: true, 
        primaryKey: true, 
        type: Sequelize.INTEGER
      },
      id_ingresso: {
        allowNull: false, 
        type: Sequelize.INTEGER
      },
      id_show: {
        allowNull: false, 
        type: Sequelize.INTEGER
      }
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('ticket_shows');
  }
};
