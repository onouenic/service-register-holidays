Microsserviço de Cadastro de Anos e Feriados

Este repositório contém um microsserviço desenvolvido com o framework Nest.js que permite o cadastro de anos e feriados em um banco de dados MySQL. O microsserviço fornece rotas RESTful para realizar operações CRUD (Create, Read, Update, Delete) nas entidades "Ano" e "Feriado".

Tecnologias utilizadas
- Node.js
- Nest.js
- TypeScript
- MySQL
- TypeORM

Configuração

Antes de executar o microsserviço, você precisa configurar o ambiente e o banco de dados. Siga as etapas abaixo para realizar a configuração necessária:

1. Certifique-se de ter o Node.js e o MySQL instalados em sua máquina.
2. Clone este repositório:
   git clone <URL do repositório>
3. Acesse o diretório do projeto:
   cd <nome do diretório>
4. Instale as dependências do projeto:
   npm install
5. Configure as informações do banco de dados no arquivo ormconfig.json presente na raiz do projeto.
6. Execute as migrações do TypeORM para criar as tabelas no banco de dados:
   npm run typeorm:migrate
7. Inicie o microsserviço:
   npm run start

Agora, o microsserviço estará sendo executado localmente.

Rotas

Anos

- GET /anos
  Obtém todos os anos cadastrados.

- GET /anos/:ano
  Obtém informações de um ano específico com base no ano fornecido.

- GET /anos/:id
  Obtém informações de um ano específico com base no ID fornecido.

- POST /anos
  Cria um novo ano. O corpo da requisição deve conter um objeto JSON com a propriedade "ano" contendo o valor do ano a ser cadastrado. Exemplo de corpo da requisição:

  {
    "ano": 2023
  }

- PUT /anos/:id
  Atualiza as informações de um ano específico com base no ID fornecido. O corpo da requisição deve conter um objeto JSON com a propriedade "ano" contendo o novo valor do ano a ser atualizado. Exemplo de corpo da requisição:

  {
    "ano": 2024
  }

- DELETE /anos/:id
  Exclui um ano específico com base no ID fornecido.

Feriados

- GET /feriados
  Obtém todos os feriados cadastrados.

- GET /feriados/:id
  Obtém informações de um feriado específico com base no ID fornecido.

- POST /feriados
  Cria um novo feriado. O corpo da requisição deve conter um objeto JSON com as propriedades "nome", "data", "tipo" e "anoId" contendo as informações do feriado a ser cadastrado. O valor da propriedade "anoId" deve ser uma string gerada por UUID(). Exemplo de corpo da requisição:

  {
    "nome": "Natal",
    "data": "2023-12-25",
    "tipo": "Nacional",
    "anoId": "b7a663a0-78d1-4f70-9823-83d6a3eab8f1"
  }

- PUT /feriados/:id
  Atualiza as informações de um feriado específico com base no ID fornecido. O corpo da requisição deve conter um objeto JSON com as propriedades a serem atualizadas. Exemplo de corpo da requisição:

  {
    "nome": "Ano Novo",
    "data": "2023-01-01",
    "tipo": "Nacional",
    "anoId": "b7a663a0-78d1-4f70-9823-83d6a3eab8f1"
  }

- DELETE /feriados/:id
  Exclui um feriado específico com base no ID fornecido.

Contribuição

Se você deseja contribuir com este projeto, sinta-se à vontade para enviar pull requests com suas melhorias. Ficaremos felizes em revisar e mesclar suas alterações.

Licença

Este projeto está licenciado sob a Licença MIT.
