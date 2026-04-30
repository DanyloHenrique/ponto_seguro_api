import type { CheckInUncheckedCreateInput } from 'generated/prisma/models'
import type { ICheckInsRepository } from '@/domain/check-in/repositories/ICheck-ins-repository'

import { prisma } from '@/lib/prisma'

export class PrismaCheckInsRepository implements ICheckInsRepository {
  async create(data: CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({ data })
    return checkIn
  }
  async getByNameAndBirth(name: string, dateBirth: Date) {
    const checkIn = await prisma.checkIn.findFirst({
      where: {
        person_name: {
          equals: name,
          mode: 'insensitive',
        },
        date_birth: dateBirth,
      },
    })
    return checkIn
  }
}
