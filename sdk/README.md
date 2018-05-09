## Utilizando o SDK
*O guia a baixo, não é necessário para a execução dos sistemas relacionados ao teste da vaga B2W, está implementação já foi criada nos serviços, desenvolvidos para o teste.

```javascript
const SDK = require("sdk");
var sdk = new SDK();
```

## Recebendo eventos
Para adicionar o consumo de novos eventos, a projetos que utiliza este SDK, basta adicionar o arquivo chamado ***events/nome_do_evento.js*** que irá responder pelos eventos de **nome_do_evento**.  
Segue exemplo:  

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

## Disparando eventos do Publisher

```javascript
var event_name = "nome_do_evento";
var data = { "id": 1 }

sdk.Events.trigger(event_name, data).then( (data) => {
  console.log("Evento enviado com sucesso!");
}).catch( (err) => {
  console.log("Aconteceu algum problema ao disparar o evento!");
})
```
