if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  require("dotenv").config({ path: __dirname + "/.env" });
}

const SDK = require("sdk");
const utils = new SDK().Utils;

utils.migrate(__dirname+"/migrations").catch((err) => {
  console.error( err );
  process.exit();
}).then( process.exit );