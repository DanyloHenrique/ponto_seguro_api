import type { MissingPerson, Prisma } from 'generated/prisma/client'

export interface IMissingPeoplesRepository {
  create(data: Prisma.MissingPersonUncheckedCreateInput): Promise<string>
  getByNameAndBirth(
    name: string,
    dateBirth: Date,
  ): Promise<MissingPerson | null>
  fetchByUserId(userId: string): Promise<MissingPerson[]>
}
