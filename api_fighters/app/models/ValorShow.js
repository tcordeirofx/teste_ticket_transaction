'use strict';
module.exports = function(sdk){
  return function(sequelize, DataTypes) {
    var ValorShow = sequelize.define('ValorShow', {
      valor: { 
        type: DataTypes.DECIMAL,
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
        singular: 'valor_show',
        plural: 'valor_shows'
      },
      timestamps: false,
      underscored: true,
      tableName: "valor_shows"
    });
    return ValorShow;
  };
}