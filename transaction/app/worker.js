if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    require("dotenv").load({ path: __dirname + "/.env" });
}

var path = require("path");
const SDK = require("sdk");

var sdk = new SDK();

sdk.loadModels( path.resolve( __dirname + "/models" ) );
sdk.Events.load( path.resolve( __dirname + '/events' ) );

sdk.Events.start();