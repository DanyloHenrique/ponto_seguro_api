import { PrismaSheltersRepository } from '@/domain/shelter/repositories/prisma/prisma-shelters-repository'
import { FetchSheltersUseCase } from '@/domain/shelter/use-cases/fetch-shelters'

export function makeFetchSheltersUseCase() {
  const prismaSheltersRepository = new PrismaSheltersRepository()
  const searchSheltersUseCase = new FetchSheltersUseCase(
    prismaSheltersRepository,
  )
  return searchSheltersUseCase
}
