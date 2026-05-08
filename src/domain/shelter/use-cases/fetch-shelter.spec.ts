import { beforeEach, describe, expect, it } from 'vitest'

import { InMemorySheltersRepository } from '@/domain/shelter/repositories/in-memory/in-memory-shelters-repository'
import { FetchSheltersUseCase } from '@/domain/shelter/use-cases/fetch-shelters'

let sheltersRepository: InMemorySheltersRepository
let sut: FetchSheltersUseCase

describe('Fetch Shelter Use Case', () => {
  beforeEach(() => {
    sheltersRepository = new InMemorySheltersRepository()
    sut = new FetchSheltersUseCase(sheltersRepository)
  })

  it('should be able to fetch shelter by query', async () => {
    await sheltersRepository.create({
      name: 'Abrigo Esperança',
      address: 'Rua Próxima, 123',
      latitude: -22.9068,
      longitude: -43.1729,
      capacity_max: 50,
      capacity_current: 10,
      userId: 'user-01',
    })
    await sheltersRepository.create({
      name: 'Abrigo Maracana',
      address: 'Rua Próxima, 123',
      latitude: -23.9068,
      longitude: -44.1729,
      capacity_max: 100,
      capacity_current: 20,
      userId: 'user-02',
    })
    await sheltersRepository.create({
      name: 'Not Found',
      address: 'Rua Próxima, 123',
      latitude: -23.9068,
      longitude: -44.1729,
      capacity_max: 100,
      capacity_current: 20,
      userId: 'user-03',
    })

    const { shelters } = await sut.execute({ query: 'Abrigo', page: 1 })

    expect(shelters.length).toBe(2)
    expect(shelters).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'Abrigo Esperança' }),
        expect.objectContaining({ name: 'Abrigo Maracana' }),
      ]),
    )
  })
})
