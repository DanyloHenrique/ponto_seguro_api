import { hash } from 'bcryptjs'
import type { IUsersRepository } from '@/domain/user/repositories/IUsersRepository'
import { UserAlreadyExistsError } from '@/errors/user-already-exists-error'

interface registerUserUseCaseRequest {
  name: string
  email: string
  password: string
}
interface registerUserUseCaseResponse {
  userId: string
}

export class RegisterUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: registerUserUseCaseRequest): Promise<registerUserUseCaseResponse> {
    const userExists = await this.usersRepository.findByEmail(email)
    if (userExists) throw new UserAlreadyExistsError()

    const password_hash = await hash(password, 6)
    const userId = await this.usersRepository.create({
      name,
      email,
      password_hash,
    })

    return { userId }
  }
}
