import { PersonMatchService } from '@/domain/@services/person-match-service'
import { PrismaCheckInsRepository } from '@/domain/check-in/repositories/prisma/prisma-check-ins-repository'
import { CheckInShelterUseCase } from '@/domain/check-in/use-cases/check-in-shelter'
import { PrismaMissingPeoplesRepository } from '@/domain/missing-person/repositories/prisma/prisma-missing-peoples-repository'
import { PrismaSheltersRepository } from '@/domain/shelter/repositories/prisma/prisma-shelters-repository'

export function makeCheckInShelterUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const sheltersRepository = new PrismaSheltersRepository()
  const missingPeoplesRepository = new PrismaMissingPeoplesRepository()

  const personMatchService = new PersonMatchService(
    missingPeoplesRepository,
    checkInsRepository,
  )

  const checkInShelterUseCase = new CheckInShelterUseCase(
    checkInsRepository,
    sheltersRepository,
    personMatchService,
  )
  return checkInShelterUseCase
}
