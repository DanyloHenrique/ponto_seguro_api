import type { Shelter } from 'generated/prisma/client'
import type { ISheltersRepository } from '@/domain/shelter/repositories/IShelters-repository'

interface fetchNearbySheltersParams {
  latitude: number
  longitude: number
}

interface fetchNearbySheltersResponse {
  shelters: Shelter[]
}

export class FetchNearbySheltersUseCase {
  constructor(private sheltersRepository: ISheltersRepository) {}

  async execute({
    latitude,
    longitude,
  }: fetchNearbySheltersParams): Promise<fetchNearbySheltersResponse> {
    const shelters = await this.sheltersRepository.findManyNearby({
      latitude,
      longitude,
    })

    return { shelters }
  }
}
