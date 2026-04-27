import type { CheckIn, Prisma } from 'generated/prisma/client'

export interface ICheckInsRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  getByNameAndBirth(name: string, dateBirth: Date): Promise<CheckIn | null>
}
