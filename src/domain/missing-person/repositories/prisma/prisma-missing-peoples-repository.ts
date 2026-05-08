import type { MissingPerson, Prisma } from 'generated/prisma/client'
import type { IMissingPeoplesRepository } from '@/domain/missing-person/repositories/IMissing-peoples-repository'
import { env } from '@/env'
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

  async getByNameAndBirthOrCpf(
    name: string,
    dateBirth: Date,
    cpf: string | null,
  ) {
    if (env.NODE_ENV !== 'test') {
      const missingPerson = await prisma.$queryRaw<MissingPerson[]>`
      SELECT * FROM missing_people
      WHERE (cpf = ${cpf})
        OR (LOWER(name) = LOWER(${name}) AND date_birth = ${dateBirth})
    `
      return missingPerson[0] ?? null
    }

    return await prisma.missingPerson.findFirst({
      where: {
        OR: [
          ...(cpf ? [{ cpf }] : []),
          {
            name: {
              equals: name,
              mode: 'insensitive',
            },
            date_birth: dateBirth,
          },
        ],
      },
    })
  }

  async updateShelter(id: string, shelterId: string) {
    await prisma.missingPerson.update({
      where: {
        id,
      },
      data: {
        shelterId,
      },
    })
  }
}
