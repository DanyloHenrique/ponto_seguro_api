import { PrismaUserRepository } from '@/domain/user/repositories/prisma/prisma-users-repository'
import { RegisterUserUseCase } from '@/domain/user/use-cases/register-user'

export function makeRegisterUserUseCase() {
  const prismaUsersRepository = new PrismaUserRepository()
  const registerUserUseCase = new RegisterUserUseCase(prismaUsersRepository)

  return registerUserUseCase
}
