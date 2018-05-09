const amqp = require('amqplib');

module.exports = {
  Handler: function( options ){
    const listenToQueue = () => amqp.connect(options.queueUrl)
          .then(connection => connection.createChannel())
          .then(channel => options.handleMessage(channel))
    
    return listenToQueue;
  }
}