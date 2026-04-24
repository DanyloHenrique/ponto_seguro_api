# Ponto Seguro API

Backend da plataforma **Ponto Seguro**, desenvolvido para centralizar informações e gestão durante situações de emergência climática e enchentes.

## Tecnologias utilizadas

- Node.js
- TypeScript
- Express 5
- Prisma ORM
- PostgreSQL
- Docker
- Zod
- TSUP

## Arquitetura

O projeto está sendo desenvolvido com foco em:

- **Arquitetura orientada ao domínio (DDD)** para separar responsabilidades por contexto de negócio
- **Princípios SOLID** para manter o código mais escalável e de fácil manutenção
- **Separação por camadas**, isolando:
  - rotas
  - controllers
  - casos de uso
  - repositórios
