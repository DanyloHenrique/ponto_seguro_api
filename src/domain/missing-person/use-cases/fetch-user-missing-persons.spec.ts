import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryMissingPeoplesRepository } from '@/domain/missing-person/repositories/in-memory/in-memory-missing-peoples-repository'
import { FetchUserMissingPersonsUseCases } from './fetch-user-missing-persons'

let missingPeoplesRepository: InMemoryMissingPeoplesRepository
let sut: FetchUserMissingPersonsUseCases

describe('Fetch User Missing Persons Use Case', () => {
  beforeEach(() => {
    missingPeoplesRepository = new InMemoryMissingPeoplesRepository()
    sut = new FetchUserMissingPersonsUseCases(missingPeoplesRepository)
  })

  it('should be able to fetch missing persons by user id', async () => {
    await missingPeoplesRepository.create({
      name: 'John Doe',
      date_birth: new Date('2001-01-01'),
      lastSeenLocation: 'Praça da Sé',
      contact_name: 'Danylou',
      contact_phone: '11999999999',
      userId: 'user-01',
      physical_description: null,
      clothes_description: null,
    })

    await missingPeoplesRepository.create({
      name: 'Jane Doe',
      date_birth: new Date('1995-05-15'),
      lastSeenLocation: 'Av. Paulista',
      contact_name: 'Emilia',
      contact_phone: '11888888888',
      userId: 'user-01',
      physical_description: null,
      clothes_description: null,
    })

    const { missingPersons } = await sut.execute({ userId: 'user-01' })

    expect(missingPersons).toHaveLength(2)
    expect(missingPersons).toEqual([
      expect.objectContaining({ name: 'John Doe' }),
      expect.objectContaining({ name: 'Jane Doe' }),
    ])
  })

  it('should not return missing persons from another user', async () => {
    await missingPeoplesRepository.create({
      name: 'John Doe',
      date_birth: new Date('2001-01-01'),
      lastSeenLocation: 'Praça da Sé',
      contact_name: 'Emilia',
      contact_phone: '11999999999',
      userId: 'user-02',
      physical_description: null,
      clothes_description: null,
    })

    const { missingPersons } = await sut.execute({ userId: 'user-01' })

    expect(missingPersons).toHaveLength(0)
  })
})
