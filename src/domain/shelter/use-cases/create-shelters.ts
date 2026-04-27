import type { Shelter } from 'generated/prisma/client'
import type { ISheltersRepository } from '@/domain/shelter/repositories/IShelters-repository'

interface registerUseCaseRequest {
  userId: string
  name: string
  address: string
  latitude: number
  longitude: number
  capacity_max: number
  capacity_current: number
}

interface registerUseCaseResponse {
  shelter: Shelter
}

export class CreateSheltersUseCase {
  constructor(private shelterRepository: ISheltersRepository) {}

  async execute({
    userId,
    name,
    address,
    latitude,
    longitude,
    capacity_max,
    capacity_current,
  }: registerUseCaseRequest): Promise<registerUseCaseResponse> {
    const shelter = await this.shelterRepository.create({
      userId,
      name,
      address,
      latitude,
      longitude,
      capacity_max,
      capacity_current,
    })

    return {
      shelter,
    }
  }
}
