module.exports = class Base {
  
  constructor(_sdk, _transactionInfos){
    this.sdk =_sdk;
    this.transactionInfos = _transactionInfos;
  }  

  retryTransaction( baseContext ){
    return new Promise( (resolve, reject) => {  
      setTimeout(function() {
        const attemptNumber = parseInt( baseContext.dbContext.attempt_number );
        const maxFails = parseInt( process.env.MAX_FAILED_ATTEMPTS );
        
        if( baseContext.dbContext.status_id == process.env.ST_TRANSACTION_FAIL 
          && attemptNumber < maxFails ){
          
          const Transaction = baseContext.sdk.connection.model( 'Transaction' );
          const nestedTransaction = baseContext.dbContext["transaction_id"];
          var obj = new Transaction({ 
            name: baseContext.dbContext.name,
            payload: baseContext.dbContext.payload,
            attempt_number: baseContext.dbContext.attempt_number + 1
          });
          if( !nestedTransaction )
            obj["transaction_id"] = baseContext.dbContext.id;
          else
            obj["transaction_id"] = nestedTransaction;

          obj.save(err => {
            if( err ) return reject( err );
            resolve(obj);
          });
        } else
          resolve();
      }, process.env.DELAY_TIME_BETWEEN_ATTEMPTS );      
    });
  }

  setStatus( baseContext, statusId, ex ){
    const self = baseContext;
    const Transaction = self.sdk.connection.model( 'Transaction' );
    
    return new Promise((resolve, reject) => {
      Transaction.findById(self.dbContext["id"]).exec(function (err, obj) {
        if (err) return reject(err);
        obj.status_id = statusId;
        obj.error = ex;
        obj.isNew = false;
        obj.save( err => {
          if( err ) return reject();
          self.dbContext = obj;
          resolve(self);
        });
      });
    });
  }

  checkResume( baseContext, exec ){
    return exec.then(() => {
      return baseContext.setStatus( baseContext, process.env.ST_TRANSACTION_SUCCESS )
              .catch( baseContext.sdk.catchError );
    }).catch( ex => {
      return baseContext.rollback_func( baseContext ).then( _baseContext => {
        return _baseContext.setStatus(_baseContext, process.env.ST_TRANSACTION_FAIL, ex )
          .then( _baseContext.retryTransaction )
          .catch( _baseContext.sdk.catchError );
      });
    });
  }
  
  loadTransactionById( baseContext ){
    return new Promise( (resolve, reject) => {
      const Transaction = this.sdk.connection.model( 'Transaction' );
      
      Transaction.findById( baseContext.transactionInfos.id ).exec( function (err, obj) {
        if( err ) return reject( err );
        baseContext.dbContext = obj;
        resolve( baseContext );
      });
    })    
  }
}