var path      = require('path');
var fs        = require('fs');

module.exports = class Load {
  static from_folder( absolute_path ){
    var events = {}
    fs.readdirSync( absolute_path )
      .filter(function(file) {
        return (file.indexOf('.') !== 0) && (file !== absolute_path) && (file.slice(-3) === '.js');
      })
      .forEach(function(file) {
        var file_path = path.resolve( path.join( absolute_path , file) );
        var object = require( file_path );
        events[object.event_name] = object;
      });
      
    return events;
  }
}