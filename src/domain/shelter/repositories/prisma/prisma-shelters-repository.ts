import type { Prisma, Shelter } from 'generated/prisma/client'
import type {
  findManyNearbyParams,
  ISheltersRepository,
} from '@/domain/shelter/repositories/IShelters-repository'
import { prisma } from '@/lib/prisma'

export class PrismaSheltersRepository implements ISheltersRepository {
  async create(data: Prisma.ShelterUncheckedCreateInput) {
    const shelter = await prisma.shelter.create({
      data,
    })
    return shelter
  }

  async findById(shelterId: string) {
    const shelter = await prisma.shelter.findUnique({
      where: {
        id: shelterId,
      },
      include: {
        checkIns: true,
      },
    })
    return shelter ?? null
  }

  async findByUserId(userId: string) {
    const shelter = await prisma.shelter.findMany({
      where: {
        userId,
      },
    })
    return shelter ?? null
  }

  async searchMany(query: string, page: number) {
    const shelters = await prisma.shelter.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            userId: query,
          },
        ],
      },
      take: 20,
      skip: (page - 1) * 20,
    })
    return shelters
  }

  async findManyNearby({ latitude, longitude }: findManyNearbyParams) {
    const shelters = await prisma.$queryRaw<Shelter[]>`
		SELECT * FROM shelters
		WHERE ( 6371 * acos( cos( radians(${latitude}::float) ) * cos( radians( latitude::float ) ) * cos( radians( longitude::float ) - radians(${longitude}::float) ) + sin( radians(${latitude}::float) ) * sin( radians( latitude::float ) ) ) ) <= 10
		ORDER BY (
  6371 * acos(
    cos(radians(${latitude}::float)) 
    * cos(radians(latitude::float)) 
    * cos(radians(longitude::float) - radians(${longitude}::float)) 
    + sin(radians(${latitude}::float)) 
    * sin(radians(latitude::float))
  )
) ASC;
    `

    return shelters
  }

  async incrementCapacity(shelterId: string): Promise<void> {
    await prisma.shelter.update({
      where: {
        id: shelterId,
      },
      data: {
        capacity_current: {
          increment: 1,
        },
      },
    })
  }
}
