# API FOO
O serviço API_FOO recebe dados da COMPRA DE INGRESSOS para armazenar os INGRESSOS POR SHOW.
Consultar a quantidade de ingressos por show.
Consulta com id_ingresso e um id_show se é uma combinação válida.

## Executando Localmente

### Dependências

-- Node
-- MySQL

### Ambiente
  PORT=4010
  DB_SYSTEM="mysql"
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