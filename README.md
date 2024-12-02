<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

# Sistema Bancário - Aplicação Backend em NestJS

Este projeto implementa um sistema bancário simples utilizando NestJS e seguindo os conceitos de Domain-Driven Design (DDD). O sistema gerencia clientes, contas bancárias e movimentações financeiras, garantindo que as regras de negócio sejam respeitadas em cada operação.

## Estrutura do Projeto

A aplicação segue a arquitetura de camadas baseada em DDD, dividida nas seguintes seções:

- **Domínio**: Entidades, Agregados, Repositórios (interfaces), Serviços de Domínio.
- **Aplicação**: Casos de Uso (Application Services).
- **Infraestrutura**: Implementações de repositórios, banco de dados e comunicação externa.

## Requisitos do Sistema

### 1. **Domínio**

#### Clientes
- Atributos:
  - Nome completo
  - CPF (único)
  - Data de nascimento
- Regras:
  - O CPF deve ser validado.
  - O cliente pode possuir uma ou mais contas bancárias.

#### Contas Bancárias
- Atributos:
  - Número da conta (gerado automaticamente)
  - Saldo inicial (opcional, padrão: zero)
  - Status da conta (ativa/inativa)
- Regras:
  - Apenas contas ativas podem realizar movimentações.
  - Uma conta está vinculada a um único cliente.

#### Movimentações Financeiras
- Tipos de movimentação:
  - Depósito
  - Saque
  - Transferência entre contas
- Regras:
  - O saldo da conta não pode ser negativo.
  - Transferências só são permitidas entre contas ativas.
  - Cada movimentação deve registrar:
    - Data/hora
    - Tipo (Depósito, Saque ou Transferência)
    - Valor
    - Contas envolvidas (origem e destino, se aplicável)

#### Endpoints obrigatórios
- **Cliente**
  - `POST /clients`: Criar um novo cliente.
  - `GET /clients/:id`: Obter informações de um cliente, incluindo suas contas.
- **Conta Bancária**
  - `POST /accounts`: Criar uma nova conta para um cliente.
  - `PATCH /accounts/:id`: Atualizar o status de uma conta (ativa/inativa).
  - `GET /accounts/:id`: Obter informações de uma conta, incluindo movimentações.
- **Movimentações**
  - `POST /transactions/deposito`: Realizar um depósito.
  - `POST /transactions/saque`: Realizar um saque.
  - `POST /transactions/transferencia`: Realizar uma transferência entre contas.

#### Banco de Dados
- Utilize **PostgreSQL**.
- **Sequelize**.

#### Validações
- Utilize **class-validator** para validar as entradas.
- Regras de negócio devem ser tratadas no domínio, não nos controladores.

#### Documentação
- **Swagger**.
- `http://localhost:3000/api/v1/docs`

## Como Rodar o Projeto


### Passos

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/sistema-bancario-nestjs.git
   cd sistema-bancario-nestjs
   cp .env.example .env

2. Docker:
   ```bash
   Instalar o Docker e docker-compose

3. Start Banco de Dados via Docker:
   ```bash
   docker-compose up --build

3. Rodar local (Sem o docker):
   ```bash
   Precisa do Node e Postgres na máqui
   npm run start:dev


## License

Nest is [MIT licensed](LICENSE).
