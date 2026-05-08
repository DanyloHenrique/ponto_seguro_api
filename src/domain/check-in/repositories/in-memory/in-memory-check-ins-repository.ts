import { randomUUID } from 'node:crypto'
import type { CheckIn, Prisma } from 'generated/prisma/client'
import type { ICheckInsRepository } from '@/domain/check-in/repositories/ICheck-ins-repository'

export class InMemoryCheckInsRepository implements ICheckInsRepository {
  checkIns: CheckIn[] = []

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn: CheckIn = {
      id: randomUUID(),
      ...data,
      cpf: data.cpf ?? null,
      date_birth: new Date(data.date_birth),
      synced: false,
      created_at: new Date(),
    }

    this.checkIns.push(checkIn)

    return checkIn
  }

  async getByNameAndBirthOrCpf(
    name: string,
    dateBirth: Date,
    cpf: string | null,
  ) {
    const checkIn = this.checkIns.find((checkIn) => {
      // Cria objetos Date para garantir e compara os milissegundos
      if (cpf) {
        const isSameCpf = checkIn.cpf === cpf
        return isSameCpf
      }

      const isSameName = checkIn.person_name === name
      const isSameDate =
        new Date(checkIn.date_birth).getTime() === dateBirth.getTime()

      return isSameName && isSameDate
    })

    return checkIn ?? null
  }
}
