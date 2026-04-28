# 🆘 Ponto Seguro API

O **Ponto Seguro** é uma plataforma de backend desenvolvida para centralizar informações e facilitar a gestão em situações de emergência climática e desastres naturais. O sistema foca na organização de abrigos, coordenação de voluntários e, principalmente, na conexão de famílias através de um sistema inteligente de "Match" para pessoas desaparecidas.

## 🚀 Funcionalidades Principais

* **Autenticação Segura:** Sistema de registo e login para voluntários com passwords hasheadas (bcryptjs) e autenticação via JWT.
* **Gestão de Abrigos:** Registo de pontos de apoio com controlo de capacidade em tempo real.
* **Geolocalização (Nearby Shelters):** Procura de abrigos num raio de proximidade utilizando a fórmula de Haversine.
* **Registo de Desaparecidos:** Base de dados para famílias reportarem desaparecimentos com descrições físicas e fotos.
* **Sistema de Match:** Ao realizar um check-in num abrigo, o sistema cruza os dados automaticamente com a base de desaparecidos e notifica os responsáveis.

## 🛠 Tecnologias e Ferramentas

* **Runtime:** Node.js com TypeScript
* **Framework:** Express 5
* **ORM:** Prisma ORM (PostgreSQL)
* **Validação:** Zod
* **Testes:** Vitest (Unitários e Integração)
* **Segurança:** JSON Web Token (JWT) & bcryptjs
* **Infraestrutura:** Docker & Docker Compose

## 🏗 Arquitetura

O projeto segue princípios de engenharia de software modernos para garantir manutenibilidade:

* **Domain-Driven Design (DDD):** Organização por domínios de negócio (Shelter, User, Missing Person).
* **SOLID:** Aplicação rigorosa dos princípios, especialmente Inversão de Dependência.
* **Clean Architecture:** Separação clara entre Regras de Negócio (Use Cases), Camada de Dados (Repositories) e Camada de Entrada (Controllers).
* **In-Memory Testing:** Repositórios em memória para garantir rapidez na execução dos testes.

## 📖 Documentação da API

A documentação detalhada das rotas e modelos de dados pode ser acedida através da nossa coleção do Postman:

> **🔗 [Ponto Seguro - API ](https://documenter.getpostman.com/view/42447767/2sBXqJJL6q)**

## 💻 Como Executar o Projeto

1.  **Clonar o Repositório:**
    ```bash
    git clone https://github.com/DanyloHenrique/ponto_seguro_api.git
    cd ponto_seguro_api
    ```

2.  **Instalar Dependências:**
    ```bash
    npm install
    ```

3.  **Configurar Variáveis de Ambiente:**
    Crie um ficheiro `.env` baseado no `.env.example`.

4.  **Base de Dados (Docker):**
    ```bash
    docker compose up -d
    npx prisma migrate dev
    ```

5.  **Iniciar Servidor:**
    ```bash
    npm run dev
    ```

---
Desenvolvido como parte da iniciativa de apoio a situações de emergência.
