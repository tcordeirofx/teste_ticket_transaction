# SERVIÇO DE TRANSAÇÂO

O serviço de transação recebe dados da COMPRA DE INGRESSOS e cria uma nova transação;  
Consulta o estado e os dados da transação criada;  
Garante que as requisições à API_FOO e API_FIGHTERS sejam executadas com sucesso;  
Permite saber o que aconteceu quando houve falhas;  
O endpoint "/assign/buy_ticket", recebe o seguinte formato para comprar de ingressos:  
{

	"data_compra" : "2020-01-01",
	"account_id": 111111,
	"id_ingresso": 650540646064560,
	"id_show": 654321,
	"valor": 654.32  
	
}

Após o envio do pedido o serviço retorna o ID da nova transação criada como resposta, no seguinte formato: { "transaction_id": "5af2fcf4af4b3c3a81a80e64" }

É possível através do ID da nova transação, consultar os dados mantidos nesta transação.
Acompanhar a sequência de tentativas em caso de falhas recorrentes.  
  
Para o acompanhamento de uma transação, acesso o Endpoint "/transactions/?transaction_id=5af2fcf4af4b3c3a81a80e64", passando ID da transação, como neste exemplo.  
  
Em caso de falha, o serviço sempre criará nova transação, a partir da última fracassada, associando-as à transação principal, até que o número de tentativas alcance o número máximo estipulado na variavel MAX_FAILED_ATTEMPTS.  
  
O intervalo entre cada tentativa após uma falha, pode ser configurado através da variavel DELAY_TIME_BETWEEN_ATTEMPTS.  

## Executando Localmente  

### Dependências  

-- Node  
-- MongoDB  
-- RabbitMQ  

### Ambiente

PORT=4001  

== Configuração MongoDB  
DB_SYSTEM="mongodb"  
DB_HOST="mongodb://endpoint:porta"  
DB_NAME="***"  
  
== Configuração RabbitMQ  
QUEUE_URL="amqp://endpoint"  
QUEUE_NAME="transactionService"  
  
== Endpoint de serviços externos  
REMOTE_FIGHTER_SERVICE_PATH="http://endpoint:4011"  
REMOTE_FOO_SERVICE_PATH="http://endpoint:4010"  
  
== Configurações de funcionamento do Serviço de Transações  
ST_TRANSACTION_SUCCESS=1 [Código p/ Status Sucesso]  
ST_TRANSACTION_IN_PROCESS=2 [Código p/ Status Processando]  
ST_TRANSACTION_PENDING=3 [Código p/ Status Pendende de Processamento]  
ST_TRANSACTION_FAIL=4 [Código p/ Status Falhou]  
  
MAX_FAILED_ATTEMPTS=8 [Quantidade de Tentativas em Caso de Falha em algum Endpoint Externo]  
DELAY_TIME_BETWEEN_ATTEMPTS=2000 [Intervalo Entre Novas Tentativas]  

### Instalando as bibliotecas
```

npm install

```  

### Configurando as Variáveis de ambiente  

Em ambiente de desenvolvimento criar o arquivo *.env* na pasta app. Ver template *.env.template*;  

### Iniciar Aplicação

```

npm start

```  

### Iniciar Worker

```

npm run worker

```
