import type { MissingPerson, Prisma } from 'generated/prisma/client'

export interface IMissingPeoplesRepository {
  create(data: Prisma.MissingPersonUncheckedCreateInput): Promise<string>
  getByNameAndBirthOrCpf(
    name: string,
    dateBirth: Date,
    cpf: string | null
  ): Promise<MissingPerson | null>
  fetchByUserId(userId: string): Promise<MissingPerson[]>
  updateShelter(id: string, shelterId: string): Promise<void>
}
