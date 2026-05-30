# Modelagem do Banco de Dados - Unidos por Patinhas

## Visão Geral

Este documento descreve a modelagem inicial do banco de dados do projeto **Unidos por Patinhas**, sistema desenvolvido para gerenciamento de adoções de animais.

A modelagem foi elaborada utilizando o brModelo e servirá como base para a implementação utilizando PostgreSQL e Prisma ORM.

---

## Diagrama

Arquivos relacionados:

* `database-model.png`
* `database-model.brM3`

---

## Entidades

### User

Responsável pelo gerenciamento dos usuários do sistema.

#### Atributos

| Campo        | Tipo      | Descrição             |
| ------------ | --------- | --------------------- |
| id           | UUID      | Identificador único   |
| name         | text      | Nome do usuário       |
| email        | text      | E-mail único          |
| passwordHash | text      | Senha criptografada   |
| telephone    | text      | Telefone para contato |
| role         | enum      | Perfil do usuário     |
| createdAt    | timestamp | Data de criação       |

#### Perfis

* PROPRIETARIO
* ADMINISTRADOR
* COMUM

#### Responsabilidades

##### PROPRIETARIO

* Criar administradores
* Gerenciar permissões do sistema
* Controle geral da plataforma

##### ADMINISTRADOR

* Cadastrar animais
* Editar animais
* Aprovar ou rejeitar solicitações de adoção

##### COMUM

* Visualizar animais disponíveis
* Solicitar adoções
* Enviar mensagens

---

### Animal

Responsável pelo cadastro dos animais disponíveis para adoção.

#### Atributos

| Campo            | Tipo      | Descrição           |
| ---------------- | --------- | ------------------- |
| id               | UUID      | Identificador único |
| name             | text      | Nome do animal      |
| species          | text      | Espécie             |
| race             | text      | Raça                |
| ageMonths        | integer   | Idade em meses      |
| description      | text      | Descrição           |
| status           | text      | Situação do animal  |
| registrationDate | timestamp | Data de cadastro    |

#### Status previstos

* DISPONIVEL
* EM_PROCESSO
* ADOTADO

---

### Adoption

Responsável pelo controle das solicitações de adoção.

#### Atributos

| Campo         | Tipo      | Descrição             |
| ------------- | --------- | --------------------- |
| id            | UUID      | Identificador único   |
| userId        | UUID      | Usuário solicitante   |
| animalId      | UUID      | Animal solicitado     |
| requestStatus | text      | Status da solicitação |
| requestDate   | timestamp | Data da solicitação   |
| responseDate  | timestamp | Data da resposta      |

#### Status previstos

* PENDENTE
* EM_ANALISE
* APROVADA
* REJEITADA

---

## Relacionamentos

### User → Adoption

Relacionamento 1:N

Um usuário pode realizar várias solicitações de adoção.

Cada solicitação pertence a apenas um usuário.

---

### Animal → Adoption

Relacionamento 1:N

Um animal pode receber várias solicitações de adoção.

Cada solicitação está associada a apenas um animal.

---

## Tecnologias Previstas

* PostgreSQL
* Prisma ORM
* NestJS
* Node.js
* Docker
* Docker Compose

---

## Observações

Esta modelagem representa a primeira versão do banco de dados e poderá sofrer alterações conforme evolução dos requisitos do projeto.
