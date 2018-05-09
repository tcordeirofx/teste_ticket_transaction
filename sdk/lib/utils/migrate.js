const SDK = require("../../index");
var Umzug = require('umzug');

module.exports = ( folder ) => {
  var sdk = new SDK();

  var Sequelize = require("sequelize");
  var sequelize = sdk.connection;

  if( !Sequelize || !sequelize ){
    throw "Sem conexão";
  }

  var migrator = new Umzug({
    storage: 'sequelize',
    storageOptions: { sequelize: sequelize, tableName: 'migrations' },
    logging: console.log,
    migrations: {
      params: [ sequelize.getQueryInterface(), Sequelize ],
      path: folder,
      pattern: /^\d+[\w-]+\.js$/,
      wrap: function (fun) {
        if (fun.length === 3) {
            return Promise.promisify(fun);
        } else {
            return fun;
        }
      }
    }
  });

  return new Promise( (res, rej) => {
    sequelize.authenticate().then(function() {
      migrator.up().then( res ).catch( rej );
    }).catch( rej );
  });
}