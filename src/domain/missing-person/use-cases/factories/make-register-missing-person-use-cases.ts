import { PersonMatchService } from '@/domain/@services/person-match-service'
import { PrismaCheckInsRepository } from '@/domain/check-in/repositories/prisma/prisma-check-ins-repository'
import { PrismaMissingPeoplesRepository } from '@/domain/missing-person/repositories/prisma/prisma-missing-peoples-repository'
import { RegisterMissingPersonUseCase } from '@/domain/missing-person/use-cases/register-missing-person'

export function makeRegisterMissingPersonUseCase() {
  const missingPeoplesRepository = new PrismaMissingPeoplesRepository()
  const checkInsRepository = new PrismaCheckInsRepository()

  const personMatchService = new PersonMatchService(
    missingPeoplesRepository,
    checkInsRepository,
  )

  const registerMissingPersonUseCase = new RegisterMissingPersonUseCase(
    missingPeoplesRepository,
    personMatchService,
  )
  return registerMissingPersonUseCase
}
