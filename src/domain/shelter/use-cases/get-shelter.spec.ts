import { beforeEach, describe, expect, it } from 'vitest'

import { InMemorySheltersRepository } from '@/domain/shelter/repositories/in-memory/in-memory-shelters-repository'
import { GetShelterUseCase } from '@/domain/shelter/use-cases/get-shelter'
import { ResourceNotFoundError } from '@/errors/resource-not-found-error'

let sheltersRepository: InMemorySheltersRepository
let sut: GetShelterUseCase

describe('Get Shelter Use Case', () => {
  beforeEach(() => {
    sheltersRepository = new InMemorySheltersRepository()
    sut = new GetShelterUseCase(sheltersRepository)
  })

  it('should be able to get shelter by id', async () => {
    const shelterCreated = await sheltersRepository.create({
      name: 'Abrigo Esperança',
      address: 'Rua Próxima, 123',
      latitude: -22.9068,
      longitude: -43.1729,
      capacity_max: 50,
      capacity_current: 10,
      userId: 'user-01',
    })

    const { shelter } = await sut.execute({ id: shelterCreated.id })

    expect(shelter).toMatchObject({ name: 'Abrigo Esperança' })
  })

  it('should not return shelters from id does not exist', async () => {
    await sheltersRepository.create({
      name: 'Abrigo de Outro Usuário',
      address: 'Rua Distante, 999',
      latitude: -22.9068,
      longitude: -43.1729,
      capacity_max: 50,
      capacity_current: 0,
      userId: 'user-02',
    })

    await expect(sut.execute({ id: 'shelter-not' })).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })
})
