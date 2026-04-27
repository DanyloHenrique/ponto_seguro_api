import type { Prisma } from 'generated/prisma/client'
import type { IMissingPeoplesRepository } from '@/domain/missing-person/repositories/IMissing-peoples-repository'
import { prisma } from '@/lib/prisma'

export class PrismaMissingPeoplesRepository
  implements IMissingPeoplesRepository
{
  async create(
    data: Prisma.MissingPersonUncheckedCreateInput,
  ): Promise<string> {
    const missingPerson = await prisma.missingPerson.create({ data })

    return missingPerson.id
  }

  async getByNameAndBirth(name: string, dateBirth: Date) {
    const missingPerson = await prisma.missingPerson.findFirst({
      where: {
        name: name,
        date_birth: dateBirth,
      },
    })

    return missingPerson
  }
}
