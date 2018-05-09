module.exports = function(sdk){
  const _ = sdk.modules.lodash,
    router = new sdk.Router(),
    Transaction = sdk.connection.model('Transaction');
  
  router.get('/transactions', function(req, resp, next){      
    const { query } = req;
    const { transaction_id } = query;

    Transaction.findById( transaction_id ).exec( (err, mainTransaction) => {
      if( err ) return next(err);
      if( !mainTransaction ) {
        resp.status("404");
        return resp.send();
      } 
      
      Transaction.find({ transaction_id: transaction_id }, (err, nestedTransactions) => {  
        if (err) return next(err);
        
        var parseObj = obj => _.pick( obj, [
          'id',
          'name',
          'status_id',
          'error',
          'attempt_number',
          'dt_created',
          'dt_updated'
        ]);
        
        const data = parseObj( mainTransaction );
        
        if( nestedTransactions && nestedTransactions.length > 0 )
          data["nesteds"] = _.map( nestedTransactions, item => parseObj( item ));
        
        next({
          transaction: data
        });
      });
    });
  });

  return router;
}