import { beforeEach, describe, expect, it } from 'vitest'

import { InMemorySheltersRepository } from '@/domain/shelter/repositories/in-memory/in-memory-shelters-repository'
import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { GetUserShelterUseCase } from './get-user-shelter'

let sheltersRepository: InMemorySheltersRepository
let sut: GetUserShelterUseCase

describe('Get User Shelter Use Case', () => {
  beforeEach(() => {
    sheltersRepository = new InMemorySheltersRepository()
    sut = new GetUserShelterUseCase(sheltersRepository)
  })

  it('should be able to get shelters by user id', async () => {
    await sheltersRepository.create({
      name: 'Abrigo Esperança',
      address: 'Rua Próxima, 123',
      latitude: -22.9068,
      longitude: -43.1729,
      capacity_max: 50,
      capacity_current: 10,
      userId: 'user-01',
    })


    const { shelter } = await sut.execute({ userId: 'user-01' })

    expect(shelter).toHaveLength(1)
    expect(shelter).toEqual([
      expect.objectContaining({ name: 'Abrigo Esperança' }),
    ])
  })

  it('should not return shelters from another user', async () => {
    await sheltersRepository.create({
      name: 'Abrigo de Outro Usuário',
      address: 'Rua Distante, 999',
      latitude: -22.9068,
      longitude: -43.1729,
      capacity_max: 50,
      capacity_current: 0,
      userId: 'user-02',
    })

    await expect(sut.execute({ userId: 'user-01' })).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })

  it('should throw ResourceNotFoundError when user has no shelters', async () => {
    await expect(sut.execute({ userId: 'user-01' })).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })
})