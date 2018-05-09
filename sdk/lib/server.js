var http = require("http");

module.exports = class Server {
  constructor( app, port ){
    this.port = port || 3000;
    this.app = app;
  }

  setPort( port ){
    this.port = port;
  }

  listen( callback ){
    this.server = http.createServer(app);
    this.server.listen( this.port, callback );
  }
}