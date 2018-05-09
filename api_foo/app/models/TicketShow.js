'use strict';
module.exports = function(sdk){
  return function(sequelize, DataTypes) {
    var TicketShow = sequelize.define('TicketShow', {
      id_ingresso: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true
        } 
      },
      id_show: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true
        } 
      }
    }, {
      name: {
        singular: 'ticket_show',
        plural: 'ticket_show'
      },
      timestamps: false,
      underscored: true,
      tableName: "ticket_shows"
    });
    return TicketShow;
  };
}