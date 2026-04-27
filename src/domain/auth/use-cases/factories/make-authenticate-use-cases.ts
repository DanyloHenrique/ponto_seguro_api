import { AuthenticateUseCase } from '@/domain/auth/use-cases/authenticate'
import { PrismaUsersRepository } from '@/domain/user/repositories/prisma/prisma-users-repository'

export function makeAuthenticateUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository)

  return authenticateUseCase
}
