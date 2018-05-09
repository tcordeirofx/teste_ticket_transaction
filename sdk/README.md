## Utilizando o SDK

```javascript
const SDK = require("sdk");
var sdk = new SDK();
```

## Recebendo eventos
Adicione ao projeto que irá consumir eventos, o arquivo chamado ***events/nome_do_evento.js*** que irá responder pelos eventos de **nome_do_evento**.

```javascript
module.exports = {
  event_name: "nome_do_evento",
  onError: function(err){
    console.log( err );
  },
  handleMessage: function( object, done ){
    console.log( "Mensagem recebida", object );
    done();
  }
}
```

No arquivo **workers.js**:

```javascript
sdk.Events.load('./events'); \\ Le todos os eventos que estão na pasta events
sdk.Events.start(); \\ Aguarda os eventos
```

Executando:

```bash
node workers.js
```

## Disparando eventos

```javascript
var event_name = "nome_do_evento";
var data = { "id": 1 }

sdk.Events.trigger(event_name, data).then( (data) => {
  console.log("Evento enviado com sucesso!");
}).catch( (err) => {
  console.log("Aconteceu algum problema ao disparar o evento!");
})
```