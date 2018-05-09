const addRouter = require("./add_router");

module.exports = function( application ){
  return {
    addRouter: addRouter( application )
  };
}