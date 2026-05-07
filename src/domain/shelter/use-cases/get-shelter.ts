import type { Shelter } from 'generated/prisma/client'
import type { ISheltersRepository } from '@/domain/shelter/repositories/IShelters-repository'
import { ResourceNotFoundError } from '@/errors/resource-not-found-error'

interface getShelterUseCaseRequest {
  id: string
}
interface getShelterUseCaseResponse {
  shelter: Shelter
}

export class GetShelterUseCase {
  constructor(private sheltersRepository: ISheltersRepository) {}
  async execute({
    id,
  }: getShelterUseCaseRequest): Promise<getShelterUseCaseResponse> {
    const shelter = await this.sheltersRepository.findById(id)

    if (!shelter) throw new ResourceNotFoundError()

    return { shelter }
  }
}
