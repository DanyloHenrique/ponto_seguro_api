import { PrismaMissingPeoplesRepository } from '@/domain/missing-person/repositories/prisma/prisma-missing-peoples-repository'
import { FetchUserMissingPersonsUseCases } from '../fetch-user-missing-persons'

export function MakeFetchUserMissingPersonsUseCases() {
  const missingPeoplesRepository = new PrismaMissingPeoplesRepository()
  const fetchUserMissingPersonsUseCases = new FetchUserMissingPersonsUseCases(
    missingPeoplesRepository,
  )
  return fetchUserMissingPersonsUseCases
}
