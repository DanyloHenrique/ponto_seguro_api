import { compare } from 'bcryptjs'
import type { User } from 'generated/prisma/client'
import type { IUsersRepository } from '@/domain/user/repositories/IUsersRepository'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)
    if (!user) {
      throw new Error('Invalid Credentials Error.')
    }

    const doesPasswordMatches = await compare(password, user.password_hash)
    if (!doesPasswordMatches) {
      throw new Error('Invalid Credentials Error.')
    }

    return {
      user,
    }
  }
}
