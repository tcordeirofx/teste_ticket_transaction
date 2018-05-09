module.exports = function(sdk){
  var router = new sdk.Router(),
      Transaction = sdk.connection.model('Transaction');

  router.post('/assign/buy_ticket', function(req, resp, next){
    var obj = new Transaction({ 
      name: "buy_ticket",
      sponsor_id: req.body.id_ingresso,
      payload: JSON.stringify( req.body )
    });
    obj.save(err => {
      if( err ) return next( err );
      next({
        transaction_id: obj["id"]
      });
    });
  });

  return router;
}