import type { CheckIn, Prisma } from 'generated/prisma/client'

export interface ICheckInsRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  getByNameAndBirthOrCpf(
    name: string,
    dateBirth: Date,
    cpf: string | null,
  ): Promise<CheckIn | null>
}
