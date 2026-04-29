import type { MissingPerson, Prisma } from 'generated/prisma/client'
import type { IMissingPeoplesRepository } from '@/domain/missing-person/repositories/IMissing-peoples-repository'
import { prisma } from '@/lib/prisma'

export class PrismaMissingPeoplesRepository
  implements IMissingPeoplesRepository
{
  async fetchByUserId(userId: string) {
    const missingPeoples = await prisma.missingPerson.findMany({
      where: {
        userId,
      },
      orderBy: {
        created_at: 'desc',
      },
    })
    return missingPeoples
  }
  
  async create(
    data: Prisma.MissingPersonUncheckedCreateInput,
  ): Promise<string> {
    const missingPerson = await prisma.missingPerson.create({ data })

    return missingPerson.id
  }

  async getByNameAndBirth(name: string, dateBirth: Date) {
    const missingPerson = await prisma.missingPerson.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive',
        },
        date_birth: dateBirth,
      },
    })

    return missingPerson
  }
}
