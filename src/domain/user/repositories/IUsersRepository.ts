import type { Prisma, User } from 'generated/prisma/client'

export interface IUsersRepository {
  create({
    name,
    email,
    password_hash,
  }: Prisma.UserUncheckedCreateInput): Promise<string>
  findByEmail(email: string): Promise<User | null>
  findById(id: string): Promise<User | null>
}
