
# Projeto Unidos por patinhas


## Processo de gerenciamento

Por favor, sigam à risca as regras abaixo a partir de hoje:

### Quadro no Taiga (Nosso Kanban)
* Nenhuma linha de código deve ser escrita sem um card correspondente no Taiga.

* Antes de começar a codificar, vá no Taiga, mova o card para "Em Progresso" e coloque seu nome nele.

* Assim que abrir o Pull Request, mova o card para "Revisão de Código (PR)".

### Nomenclatura Padrão de Branches
Para mantermos o repositório organizado, todas as branches devem seguir o formato: 
#### dev-[ID_DO_DEV]/[ANO][MÊS][SEMANA]-[ID_TAIGA]

* Exemplo 1: Se você é o Dev 02, estamos em 2026 na Semana 4 de Maio (054) e pegou o card #73 no Taiga, sua branch deve ser: ```dev-02/26054-073```
* Exemplo 2: Se você é o Dev 10, estamos em 2027 na Semana 2 de Dezembro (122) e pegou o card #101 no Taiga, sua branch deve ser: ```dev-10/27112-101```

#### 1. Vá para a branch principal e baixe as novidades do time
```
git checkout main
git pull origin main
```
#### 2. Crie a sua branch a partir da main atualizada e verifique se está nela
```
git checkout -b dev-[id_dev]/[ano][mes][semana]-[id_taiga]
git branch
```
#### 3. Faça seu código, adicione e commite (use mensagens claras!)
```
git add .
git commit -m "feat: adiciona componente X para a tela Y"
```

#### 4. Envie sua branch para o GitHub
```
git push origin dev-[id_dev]/[ano][mes][semana]-[id_taiga]
```

#### 5. Abrir o Pull Request (PR):
Vá ao GitHub, clica em "Compare & pull request", descreve brevemente o que fez e vincula o link do card do Taiga. No Taiga, ele move o card para Code Review.

#### 6. Revisão de Pares:
Outro dev do time abre o PR, olha o código, faz comentários se necessário e dá o "Approve".

#### 7. Merge e Fechamento:
Com a aprovação, o desenvolvedor (ou o líder técnico) clica em Merge. O código entra na main. O card no Taiga é movido para Ready for QA e, após o teste rápido, para Closed.

## Devs

#### dev-01: Pedro Henrique x
##### Github: Pedro-HenriqueQrz

#### dev-02: Jozenias Antônio x
##### Github: fayrghos

#### dev-03: Johan Queiroz x
##### Github: johanpq

#### dev-04: Lavínia Dantas x
##### Github: LilPuppet

#### dev-05: Mateus Gomes x
##### Github: GSmateus07

#### dev-06: Enzo Morgan x
##### Github: enzomorgan

#### dev-07: Andeson Almeida x
##### Github: AndesondaCruz

#### dev-08: Lucas Assis da Costa Pereira x
##### Github: lucascp05

#### dev-09: Luiz Felipe x
##### Github: luizLopes10

#### dev-10: Hudson Sena x
##### Github: HudsonSena

#### dev-11: João Victor da Silva Lira -
##### Github: -----

#### dev-12: Leandro Savio Barros Gomes x
##### Github: Leandrinz

#### dev-13: Pedro Luz x
##### Github: pedrodamiaoluz

#### dev-14: Thyago Melo x
##### Github: thyagofab

#### dev-15: Gerliano
##### Github: -----

#### dev-16: Pedro Maia
##### Github: -----

## Rodando o Backend Localmente

### Pré-requisitos
* Node.js instalado
* Docker e Docker Compose instalados

### Passo a passo

#### 1. Acesse a pasta do backend
```bash
cd unidosPorPatinhasBack
```

#### 2. Instale as dependências
```bash
npm install
```

#### 3. Configure as variáveis de ambiente
Crie um arquivo `.env` na raiz do backend baseado no `.env.example`:
```bash
cp .env.example .env
```

Edite o `.env` com suas configurações:
```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DB_NAME?schema=public"
JWT_SECRET="sua-chave-secreta-aqui"
JWT_EXPIRES_IN="7d"
```

#### 4. Suba o banco de dados com Docker
```bash
docker compose up -d
```

#### 5. Execute as migrations do Prisma
```bash
npx prisma migrate dev
```

#### 6. Inicie o servidor
```bash
npm run start:dev
```

O servidor estará disponível em: `http://localhost:3000`

### Endpoints disponíveis

#### Autenticação
| Método | Rota | Descrição |
|---|---|---|
| POST | /auth/login | Realiza login e retorna token JWT |

#### Exemplo de requisição — Login
```json
POST http://localhost:3000/auth/login
Content-Type: application/json

{
  "email": "usuario@email.com",
  "password": "suasenha123"
}
```

#### Exemplo de resposta — Sucesso (200)
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Exemplo de resposta — Credenciais inválidas (401)
```json
{
  "message": "Credenciais inválidas.",
  "error": "Unauthorized",
  "statusCode": 401
}
```
