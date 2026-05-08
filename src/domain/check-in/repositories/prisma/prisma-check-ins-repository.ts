import type { CheckIn } from 'generated/prisma/client'
import type { CheckInUncheckedCreateInput } from 'generated/prisma/models'
import type { ICheckInsRepository } from '@/domain/check-in/repositories/ICheck-ins-repository'
import { env } from '@/env'
import { prisma } from '@/lib/prisma'

export class PrismaCheckInsRepository implements ICheckInsRepository {
  async create(data: CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({ data })
    return checkIn
  }
  async getByNameAndBirthOrCpf(
    name: string,
    dateBirth: Date,
    cpf: string | null,
  ) {
    if (env.NODE_ENV !== 'test') {
      const checkIns = await prisma.$queryRaw<CheckIn[]>`
        SELECT * FROM check_ins
        WHERE (cpf = ${cpf})
          OR (LOWER(person_name) = LOWER(${name}) AND date_birth = ${dateBirth})
      `
      return checkIns[0] ?? null
    }

    return await prisma.checkIn.findFirst({
      where: {
        OR: [
          ...(cpf ? [{ cpf }] : []),
          {
            person_name: {
              equals: name,
              mode: 'insensitive',
            },
            date_birth: dateBirth,
          },
        ],

        person_name: {
          equals: name,
          mode: 'insensitive',
        },
        date_birth: dateBirth,
      },
    })
  }
}
