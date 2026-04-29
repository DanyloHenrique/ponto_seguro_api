import { randomUUID } from 'node:crypto'
import type { MissingPerson, Prisma } from 'generated/prisma/client'
import type { IMissingPeoplesRepository } from '../IMissing-peoples-repository'

export class InMemoryMissingPeoplesRepository
  implements IMissingPeoplesRepository
{
  fetchByUserId(userId: string): Promise<MissingPerson[]> {
    throw new Error('Method not implemented.')
  }
  public missingPeoples: MissingPerson[] = []

  async create(data: Prisma.MissingPersonUncheckedCreateInput) {
    const missingPerson = {
      id: randomUUID(),
      ...data,
      date_birth: new Date(data.date_birth),
      created_at: new Date(),
      physical_description: data.physical_description ?? null,
      clothes_description: data.clothes_description ?? null,
    }

    this.missingPeoples.push(missingPerson)
    return missingPerson.id
  }

  async getByNameAndBirth(name: string, dateBirth: Date) {
    const person = this.missingPeoples.find((person) => {
      // Cria objetos Date para garantir e compara os milissegundos
      const isSameName = person.name === name
      const isSameDate =
        new Date(person.date_birth).getTime() === dateBirth.getTime()

      return isSameName && isSameDate
    })

    return person ?? null
  }
}
