var path      = require('path');
var fs        = require('fs');

module.exports = class Load {
  static from_folder( absolute_path, sdk ){
    var db = {}
    fs.readdirSync( absolute_path )
      .filter(function(file) {
        return (file.indexOf('.') !== 0) && (file !== absolute_path) && (file.slice(-3) === '.js');
      })
      .forEach(function(file) {
        var model = require( path.resolve(path.join( absolute_path , file)) )(sdk)( sdk.connection, sdk.modules.sequelize );
        sdk.models[model.name] = model;
      });

    Object.keys(sdk.models).forEach(function(modelName) {
      if (sdk.models[modelName].associate) {
        sdk.models[modelName].associate(sdk.models);
      }
    });

    return sdk.models;
  }
}