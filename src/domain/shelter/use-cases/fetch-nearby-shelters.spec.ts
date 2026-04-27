import { beforeEach, describe, expect, it } from 'vitest'

import { InMemorySheltersRepository } from '@/domain/shelter/repositories/in-memory/in-memory-shelters-repository'
import { FetchNearbySheltersUseCase } from './fetch-nearby-shelters'

let sheltersRepository: InMemorySheltersRepository
let sut: FetchNearbySheltersUseCase

describe('Fetch Nearby Shelters Use Case', () => {
  beforeEach(() => {
    sheltersRepository = new InMemorySheltersRepository()
    sut = new FetchNearbySheltersUseCase(sheltersRepository)
  })

  // create two shelters a larger distance apart
  // execute the use case passing a coordinate close to the first shelter
  it('should be able to fetch nearby shelters', async () => {
    await sheltersRepository.create({
      id: 'shelter-01',
      name: 'Abrigo Esperança (Perto)',
      address: 'Rua Próxima, 123',
      latitude: -22.9068,
      longitude: -43.1729,
      capacity_max: 50,
      capacity_current: 10,
    })

    await sheltersRepository.create({
      id: 'shelter-02',
      name: 'Abrigo Distante (Longe)',
      address: 'Rua Muito Longe, 999',
      latitude: -23.5505,
      longitude: -46.6333,
      capacity_max: 100,
      capacity_current: 0,
    })

    const { shelters } = await sut.execute({
      latitude: -22.906,
      longitude: -43.172,
    })

    expect(shelters).toHaveLength(1)
    expect(shelters).toEqual([
      expect.objectContaining({ name: 'Abrigo Esperança (Perto)' }),
    ])
  })
})
