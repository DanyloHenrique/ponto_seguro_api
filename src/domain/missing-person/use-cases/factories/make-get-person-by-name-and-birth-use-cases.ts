import { PrismaMissingPeoplesRepository } from '@/domain/missing-person/repositories/prisma/prisma-missing-peoples-repository'
import { GetPersonByNameAndBirthUseCase } from '@/domain/missing-person/use-cases/get-person-by-name-and-birth'

export function makeGetPersonByNameAndBirthUseCase() {
  const missingPeoplesRepository = new PrismaMissingPeoplesRepository()
  const getPersonByNameAndBirthUseCase = new GetPersonByNameAndBirthUseCase(
    missingPeoplesRepository,
  )
  return getPersonByNameAndBirthUseCase
}
