import type { Shelter } from 'generated/prisma/client'
import type { ISheltersRepository } from '@/domain/shelter/repositories/IShelters-repository'
import { ResourceNotFoundError } from '@/errors/resource-not-found-error'

interface GetUserShelterUseCaseRequest {
  userId: string
}
interface GetUserShelterUseCaseResponse {
  shelter: Shelter[]
}

export class GetUserShelterUseCase {
  constructor(private sheltersRepository: ISheltersRepository) {}
  async execute({
    userId,
  }: GetUserShelterUseCaseRequest): Promise<GetUserShelterUseCaseResponse> {
    const shelter = await this.sheltersRepository.findByUserId(userId)

    if (!shelter) throw new ResourceNotFoundError()
    return { shelter }
  }
}
