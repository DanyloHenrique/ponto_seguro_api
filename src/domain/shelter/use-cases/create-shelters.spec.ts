import { beforeEach, describe, expect, it } from 'vitest'

import { InMemorySheltersRepository } from '@/domain/shelter/repositories/in-memory/in-memory-shelters-repository'
import { CreateSheltersUseCase } from '@/domain/shelter/use-cases/create-shelters'

let sheltersRepository: InMemorySheltersRepository
let sut: CreateSheltersUseCase

describe('Create Shelter Use Case', () => {
  beforeEach(() => {
    sheltersRepository = new InMemorySheltersRepository()
    sut = new CreateSheltersUseCase(sheltersRepository)
  })

  it('should be able create shelter', async () => {
    const { shelter } = await sut.execute({
      name: 'Abrigo Esperança',
      address: 'Rua esperança, 22',
      latitude: -23.5505,
      longitude: -46.6333,
      capacity_max: 100,
      capacity_current: 0,
      userId: 'user-01',
    })

    expect(shelter).toMatchObject({
      id: expect.any(String),
      name: 'Abrigo Esperança',
    })
  })
})
