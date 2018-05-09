const App = require("./lib/app");
const Service = require("./lib/services");
const Workers = require("./lib/workers");
const Events = require("./lib/events");

const modules = {
  "lodash": require("lodash"),
  "express": require("express"),
  "cors": require("cors"),
  "body-parser": require("body-parser"),
  "request": require("request-promise"),
  "sequelize": require("sequelize")
}

module.exports = class SDK {
  constructor( options ){

    this.modules = modules;
    this.models = [];    
    this.application = new App( this );
    this.vars = {};
    this.Service = Service( this );
    this.Router = this.application.Router;    
    this.Workers = Workers;    
    this.Events = Events( this );
    this.Utils = require("./lib/utils");
    this.connectDatabase();    
  }

  log( msg ){
    console.log( msg );
  }

  error( error ){
    console.log( error.error, error.message );
  }

  catchError(e){
    console.log( e );
  }

  connectDatabase(){
    this.connection = require('./lib/models/' + process.env.DB_SYSTEM + '/conn').open();
  }

  loadModels( folder ){
    this.models = require('./lib/models/' + process.env.DB_SYSTEM + '/load').from_folder( folder, this );
  }
  
  listen( port ){
    this.application.before_listen();
    this.application.listen(port, function(){
      console.log('Express server listening on port ' + port);
    });
  }
}
