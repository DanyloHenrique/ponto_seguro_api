import type { UserUncheckedCreateInput } from 'generated/prisma/models'
import type { IUsersRepository } from '@/domain/user/repositories/IUsersRepository'
import { prisma } from '@/lib/prisma'

export class PrismaUsersRepository implements IUsersRepository {
  async create({ name, email, password_hash }: UserUncheckedCreateInput) {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password_hash,
      },
    })

    return user.id
  }
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    return user
  }
  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })
    return user
  }
}
