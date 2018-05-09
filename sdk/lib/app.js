const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const server = require("./server");
var app = express();
var morgan = require("morgan");

module.exports = class App {
  constructor( sdk, options ){
    this.application = app;
    this.sdk = sdk;
    this.boot();
    this.Router = express.Router;
  }

  boot(){
    this.application.use( cors() );
    this.application.use( bodyParser.urlencoded({ extended: true }) );
    this.application.use( bodyParser.json() );
  }

  use( router ){
    this.application.use( router );
  }

  before_listen(){
    app.use(morgan('combined'));
    app.use( this.handler_json() );
  }

  listen( port, callback ){
    return app.listen( port, callback );
  }

  handler_json(){
    var self = this;
    return function(err, req, res, next){
      if( !err.status ){
        res.json( err );
      }else{
        var error = new Error(err.message || 'Not Found');
        error.status = err.status || 404;
        next(error);
      }
    }
  }

  error_handler(){
    return function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
    };
  }
}