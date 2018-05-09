const libPath = "./../lib/transactions/";

module.exports = {
  event_name: "transaction_created",
  handleMessage: function( sdk, obj ){
    const TypeMethod = require(libPath + obj["sponsor"]);
    const transactionMethod = new TypeMethod(sdk, obj);

    return transactionMethod.init().catch( sdk.catchError );
  }
};