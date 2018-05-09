const Base = require("./base")
module.exports = class BuyTicket extends Base {
  constructor(sdk, transactionInfos){
    super(sdk, transactionInfos)
  }
  
  exec(baseContext){
    const payload = JSON.parse( baseContext.dbContext.payload ),
          promises = [];
    
    promises.push(
      baseContext.sdk.modules.request.post( 
        process.env.REMOTE_FIGHTER_SERVICE_PATH + '/api/v1/valores', {
          body: {
            valor: payload["valor"],
            id_show: payload["id_show"]
          },
          json: true
        }));

    promises.push(
      baseContext.sdk.modules.request.post( process.env.REMOTE_FOO_SERVICE_PATH + '/api/v1/tickets', {
        body: {
          id_ingresso: payload["id_ingresso"],
          id_show: payload["id_show"]
        },
        json: true
      }));

    return baseContext.checkResume( baseContext, Promise.all( promises ));
  }

  rollback(baseContext){
    //To-do: Implentar rollback se necessário.
    return Promise.resolve(baseContext);
  }

  init(){
    Base.prototype.rollback_func = this.rollback;
    const base = this;
    return base.loadTransactionById( base ).then( baseContext => {
      return base.setStatus( baseContext, process.env.ST_TRANSACTION_IN_PROCESS ).then( base.exec );
    });
  }
}