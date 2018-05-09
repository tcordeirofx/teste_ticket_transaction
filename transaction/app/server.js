const path = require("path");

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  require("dotenv").config({ path: __dirname + "/.env" });
}

const SDK = require("sdk");

var sdk = new SDK();

sdk.loadModels( path.resolve( __dirname + "/models" ) );

var AssignRouter = require('./routes/assign')(sdk);
var TransactionRouter = require('./routes/transactions')(sdk);

sdk.Service.addRouter( AssignRouter );
sdk.Service.addRouter( TransactionRouter );

var healthRouter = new sdk.Router();
healthRouter.get('/health', (req, res)=>{
  res.json({ status: "Ok!" });
});
sdk.Service.addRouter( healthRouter );

sdk.listen( process.env.PORT || 3000 );