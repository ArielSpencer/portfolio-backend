![Static Badge](https://img.shields.io/badge/Ariel%20Spencer-Portfolio%20Backend%20APIs-8530D5) ![GitHub License](https://img.shields.io/github/license/arielspencer/portfolio-backend)

# Backend para Aplicações de Blog

Este projeto é um backend desenvolvido para gerenciar aplicações que incluem funcionalidades de blog, autenticação de usuários, upload de imagens e armazenamento de dados para aplicações Next.js. Ele utiliza tecnologias como Node.js, Express, MongoDB, NextAuth e AWS SDK para integração com o Cloudflare R2.

## Índice

1. [Requisitos](#requisitos)
2. [Instalação](#instalação)
3. [Configuração](#configuração)
4. [Estrutura do Projeto](#estrutura-do-projeto)
5. [APIs Disponíveis](#apis-disponíveis)
   - [Autenticação](#autenticação)
   - [Posts](#posts)
   - [Imagens](#imagens)
   - [Upload](#upload)
6. [Execução](#execução)
7. [Contribuição](#contribuição)
7. [Licença](#licença)

## Requisitos

- Node.js
- Banco de Dados Configurado com o MongoDB Atlas
- Conta no Cloudflare R2 com bucket

## Instalação

1. Clone o repositório:

   ```sh
   git clone https://github.com/ArielSpencer/portfolio-backend.git
   cd portfolio-backend
   ```

2. Instale as dependências:

   ```sh
   npm install
   ```

## Configuração

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis de ambiente:

```env
MONGODB_URI=mongodb+srv://<usuario>:<senha>@cluster.mongodb.net/nome-do-banco?retryWrites=true&w=majority&appName=Cluster0

USERNAME=nome-do-usuario
PASSWORD=sua-senha

NEXTAUTH_SECRET=seu-segredo-nextauth

CLOUDFLARE_R2_ACCESS_KEY_ID=sua-chave-de-acesso
CLOUDFLARE_R2_SECRET_ACCESS_KEY=sua-chave-secreta
CLOUDFLARE_R2_REGION=auto
CLOUDFLARE_R2_ENDPOINT=https://<seu-endpoint-cloudflare>.r2.cloudflarestorage.com
CLOUDFLARE_R2_BUCKET_NAME=nome-do-bucket-r2
```

## Estrutura do Projeto

```
PORTFOLIO-BACKEND/
├── api/
│   ├── auth/
│   │   └── [...nextauth].js
│   ├── blog/
│   │   └── route.js
│   ├── images/
│   │   └── route.js
│   └── upload/
│       └── route.js
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   ├── imageController.js
│   ├── postController.js
│   └── uploadController.js
├── models/
│   └── PostModel.js
├── routes/
│   ├── authRoutes.js
│   ├── imageRoutes.js
│   ├── postRoutes.js
│   └── uploadRoutes.js
├── utils/
│   └── middleware.js
├── .env.local
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── server.js
```

## APIs Disponíveis

### Autenticação

A autenticação é gerenciada pelo NextAuth com o provedor de credenciais.

- **Rota:** `/api/auth/signin`
- **Métodos:** `POST`
- **Descrição:** Autentica usuários com base em nome de usuário e senha.

### Posts

Gerencia as operações de CRUD para posts do blog.

- **Rota:** `/api/post`
- **Métodos:** `GET`, `POST`
- **Descrição:**
  - `GET`: Retorna todos os posts ou um post específico com base no ID.
  - `POST`: Cria um novo post.

### Imagens

Gerencia as operações de listagem e exclusão de imagens no Cloudflare R2.

- **Rota:** `/api/images`
- **Métodos:** `GET`, `DELETE`
- **Descrição:**
  - `GET`: Lista todas as imagens no bucket.
  - `DELETE`: Deleta uma imagem específica com base na chave.

### Upload

Gerencia o upload de arquivos para o Cloudflare R2.

- **Rota:** `/api/upload`
- **Métodos:** `POST`
- **Descrição:** Gera uma URL assinada para upload de arquivos.

## Execução

Para iniciar o servidor, execute:

```sh
npm start
```

O servidor estará disponível em [http://localhost:5003](http://localhost:5003).

## Contribuição

Sinta-se à vontade para contribuir com este projeto. Faça um fork do repositório, crie uma branch para suas alterações e envie um pull request.

## Licença

Este projeto está sob a [Licença MIT](https://github.com/ArielSpencer/portfolio-backend?tab=MIT-1-ov-file).

#### Developed by [Ariel Spencer](https://arielspencer.com.br)