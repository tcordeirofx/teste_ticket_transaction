const EventLoad = require("./events/load");

module.exports = function( sdk ){
    
  return class Event{
    static notHandled( body, done ){
      sdk.log("Handled[UNKNOWN]", body );
      done();
    }

    static handlerError( done ){
      return function(error){
        sdk.error( error );
        sdk.log("Handled[ERROR]", error );
        console.error( error );
        done();
      }
    }

    static handlerSuccess( done ){
      return function(object){
        sdk.log("Handled[SUCCESS]", object );
        done();
      }
    }

    static triggerError( error ){
      sdk.error( error );
      console.error( error );
      sdk.log("Trigger[ERROR]", error );
    }

    static handleMessage( event_name, object ){
      console.log("Event " + event_name + " Handle");
      return new Promise( (resolve, reject) => {
        var obj = sdk.events[ event_name ];
        if( obj ){
          try{
            obj.handleMessage( sdk, object ).then( resolve ).catch( reject )
          }catch(e){
            reject(e)
          }
        }else{
          Event.notHandled( object, resolve );
        }
      });
    } 

    static load( path ){
      const assertQueueOptions = { durable: true }
      const consumeQueueOptions = { noAck: false };

      const processEvent = (message) => {
        return new Promise( (resolve, reject) =>{
          try{
            console.log( "Service Handle" );
            var body = JSON.parse( message.content.toString() );
            return Event.handleMessage( body.event_name, body.message )
                      .then( Event.handlerSuccess(resolve) )
                      .catch(function(error){
                          Event.handlerError(resolve)({ error: error, message: message })
                      });
          }catch(e){
            console.log(e)
            Event.handlerError(resolve)({ error: e, message: message });
          }
        });
      }

      const handleAMQPMessage = (channel) => {
        try{
          return channel.assertQueue(process.env.QUEUE_NAME, assertQueueOptions)
            .then(() => channel.prefetch(1))
            .then(() => channel.consume(process.env.QUEUE_NAME, function(msg) {
              processEvent(msg).then( channel.ack(msg) )
            }, consumeQueueOptions))
        } catch(e){
          console.log(e);
        }
      }

      sdk.events = EventLoad.from_folder( path );
      sdk.worker = sdk.Workers.Handler({ queueUrl: process.env.QUEUE_URL, handleMessage: handleAMQPMessage });
    }

    static trigger( eventName, data ){
      
      const assertAndSendToQueue = (channel, _eventName, message) => {
        const assertQueueOptions = { durable: true }
        const sendToQueueOptions = { persistent: true }
  
        var data = { event_name: _eventName, message: message };
        const bufferedData = Buffer.from(JSON.stringify( data ));
      
        return channel.assertQueue( process.env.QUEUE_NAME, assertQueueOptions )
          .then(() => channel.sendToQueue( process.env.QUEUE_NAME, bufferedData, sendToQueueOptions ))
          .then(() => channel.close())
      }

      var amqp = require('amqplib');
      
      return amqp.connect( process.env.QUEUE_URL )
      .then( connection => connection.createChannel() )
      .then( channel => assertAndSendToQueue( channel, eventName, data ))
    }

    static start(){
      if( sdk.worker ){
        sdk.worker();
        sdk.log("Worker[STARTED]", {});
      }else{
        sdk.log("Worker[ERROR]", { message: "not started"});
      }
    }
  }
}