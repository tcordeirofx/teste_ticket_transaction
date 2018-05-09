# API FIGHTERS
O serviço API_FIGHTERS recebe dados da COMPRA DE INGRESSOS para armazenar os VALORES POR SHOW.  
Consultar o valor total por show.  
Consultar o tícket médio por show (soma dos valores / total de valores).  

## Executando Localmente

### Dependências

-- Node  
-- MySQL  

### Ambiente
  PORT=4011  
  DB_SYSTEM="sequelize"  
  DB_NAME  
  DB_USERNAME  
  DB_PASSWORD  
  DB_HOST
  
### Instalando as bibliotecas

```
npm install
```

### Configurando as Váriaveis de ambiente

Em ambiente de desenvolvimento criar o arquivo *.env* na pasta app. Ver template *.env.template*;

### Migrando o banco de dados

```
npm run migrate
```

### Rodando
```
npm start
```
