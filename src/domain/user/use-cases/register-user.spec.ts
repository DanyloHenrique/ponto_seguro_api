import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUsersRepository } from '@/domain/user/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from '@/errors/user-already-exists-error'
import { RegisterUserUseCase } from './register-user'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUserUseCase

describe('Register User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUserUseCase(usersRepository)
  })

  it('should be able to register a user', async () => {
    const { userId } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(userId).toEqual(expect.any(String))
  })

  it('should hash the password on register', async () => {
    await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const user = await usersRepository.findByEmail('johndoe@example.com')

    expect(user?.password_hash).not.toEqual('123456')
  })

  it('should throw UserAlreadyExistsError when email is already registered', async () => {
    await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    await expect(
      sut.execute({
        name: 'John Doe 2',
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
