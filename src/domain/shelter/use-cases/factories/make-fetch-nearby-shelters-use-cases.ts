import { PrismaSheltersRepository } from '@/domain/shelter/repositories/prisma/prisma-shelters-repository'
import { FetchNearbySheltersUseCase } from '@/domain/shelter/use-cases/fetch-nearby-shelters'

export function makeFetchNearbySheltersUseCase() {
  const prismaSheltersRepository = new PrismaSheltersRepository()
  const searchNearbyUseCase = new FetchNearbySheltersUseCase(
    prismaSheltersRepository,
  )
  return searchNearbyUseCase
}
