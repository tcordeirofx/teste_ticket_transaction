'use strict';

module.exports = function(sdk){
  return function(connection, Schema) {
    var schema = new Schema({
        name: String,
        sponsor_id: String,
        payload: String,
        status_id: { type: Number, default: process.env.ST_TRANSACTION_PENDING },
        transaction_id: Schema.Types.ObjectId,
        error: String,
        attempt_number: { type: Number, default: 1 },
        dt_created: { type: Date, default: Date.now },
        dt_updated: { type: Date, default: Date.now }
    });

    schema.pre('save', function(next) {
      this.wasNew = this.isNew;
      next();
    });
    
    schema.post('save', function(doc, next) {            
      if( this.wasNew ){        
        sdk.Events.trigger('transaction_created', { sponsor: doc.name, id: doc.id }).then(() => {
          next();
        }).catch( sdk.catchError )
      } else
        next();
    });

    return connection.model('Transaction', schema);
  };
};