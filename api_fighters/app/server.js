if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  require("dotenv").config({ path: __dirname + "/.env" });
}

const path = require("path");
const SDK = require("sdk");
var sdk = new SDK();

sdk.loadModels( path.resolve( __dirname + "/models" ) );

sdk.Service.addRouter( require('./routes/valores')(sdk) );

var healthRouter = new sdk.Router();
healthRouter.get('/health', (req, res)=>{
  res.json({ status: "Ok!" });
});
sdk.Service.addRouter( healthRouter );

sdk.listen( process.env.PORT || 3000 );