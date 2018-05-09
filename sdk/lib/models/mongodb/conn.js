var mongoose = require('mongoose');

module.exports = class Conn {
  static open(db_host, db_name){
    const name = db_name || process.env.DB_NAME;
    const host = db_host || process.env.DB_HOST;

    mongoose.connect(host + '/' + name);

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
      console.log("Mongo connection openned!")
    });

    return mongoose;
  }
}