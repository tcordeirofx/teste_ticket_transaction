const Sequelize = require('sequelize');

module.exports = class Init {
  static open(db_host, db_username, db_password, db_name){
    const name = db_name || process.env.DB_NAME;
    const username = db_username || process.env.DB_USERNAME;
    const password = db_password || process.env.DB_PASSWORD;
    const host = db_host || process.env.DB_HOST;

    const sequelize = new Sequelize( name, username, password, {
      dialect: "mysql",
      host: host
    });

    sequelize.dialect.supports.schemas = true;

    return sequelize;
  }
}