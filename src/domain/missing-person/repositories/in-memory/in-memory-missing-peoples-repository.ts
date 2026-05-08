import { randomUUID } from 'node:crypto'
import type { MissingPerson, Prisma } from 'generated/prisma/client'
import type { IMissingPeoplesRepository } from '../IMissing-peoples-repository'

export class InMemoryMissingPeoplesRepository
  implements IMissingPeoplesRepository
{
  public missingPeoples: MissingPerson[] = []

  async updateShelter(id: string, shelterId: string): Promise<void> {
    const missingPerson = this.missingPeoples.find((person) => person.id === id)
    if (missingPerson) missingPerson.shelterId = shelterId
  }
  async fetchByUserId(userId: string): Promise<MissingPerson[]> {
    const missingPeoples = this.missingPeoples.filter((person) => {
      return person.userId === userId
    })
    return missingPeoples
  }

  async create(data: Prisma.MissingPersonUncheckedCreateInput) {
    const missingPerson = {
      id: randomUUID(),
      ...data,
      date_birth: new Date(data.date_birth),
      cpf: data.cpf ?? null,
      created_at: new Date(),
      physical_description: data.physical_description ?? null,
      clothes_description: data.clothes_description ?? null,
      shelterId: data.shelterId ?? null,
    }

    this.missingPeoples.push(missingPerson)
    return missingPerson.id
  }

  async getByNameAndBirthOrCpf(
    name: string,
    dateBirth: Date,
    cpf?: string | null,
  ) {
    const person = this.missingPeoples.find((person) => {
      // Cria objetos Date para garantir e compara os milissegundos
      if (cpf) {
        const isSameCpf = person.cpf === cpf
        return isSameCpf
      }

      const isSameName = person.name === name
      const isSameDate =
        new Date(person.date_birth).getTime() === dateBirth.getTime()

      return isSameName && isSameDate
    })

    return person ?? null
  }
}
