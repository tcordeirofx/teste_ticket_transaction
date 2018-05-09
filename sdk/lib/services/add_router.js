module.exports = function(sdk){
    return function(router){
      var app = sdk.application;
      app.use( router );
    }
  }