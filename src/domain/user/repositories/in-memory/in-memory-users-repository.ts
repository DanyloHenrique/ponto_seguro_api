import { randomUUID } from 'node:crypto'
import type { User } from 'generated/prisma/client'
import type { UserUncheckedCreateInput } from 'generated/prisma/models'
import type { IUsersRepository } from '@/domain/user/repositories/IUsersRepository'

export class InMemoryUsersRepository implements IUsersRepository {
  users: User[] = []

  async create({ name, email, password_hash }: UserUncheckedCreateInput) {
    const user: User = {
      id: randomUUID(),
      name,
      email,
      password_hash,
      role: 'COMMON',
    }

    this.users.push(user)

    return user.id
  }
  async findByEmail(email: string) {
    const user = this.users.find((user) => user.email === email)
    if (!user) return null
    return user
  }
  async findById(id: string) {
    const user = this.users.find((user) => user.id === id)
    if (!user) return null
    return user
  }
}
