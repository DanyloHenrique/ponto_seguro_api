import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryMissingPeoplesRepository } from '@/domain/missing-person/repositories/in-memory/in-memory-missing-peoples-repository'
import { GetPersonByNameAndBirthUseCase } from '@/domain/missing-person/use-cases/get-person-by-name-and-birth'

let missingPeoplesRepository: InMemoryMissingPeoplesRepository
let sut: GetPersonByNameAndBirthUseCase

describe('Get Person By Name and Birth Use Case', () => {
  beforeEach(() => {
    missingPeoplesRepository = new InMemoryMissingPeoplesRepository()
    sut = new GetPersonByNameAndBirthUseCase(missingPeoplesRepository)
  })

  it('should be able to find a missing person by name and birth', async () => {
    await missingPeoplesRepository.create({
      name: 'John Doe',
      date_birth: new Date('2001-01-01'),
      lastSeenLocation: 'Praça da Sé',
      contact_name: 'Emilia',
      contact_phone: '11999999999',
      userId: 'user-01',
      physical_description: null,
      clothes_description: null,
    })

    const result = await sut.execute({
      name: 'John Doe',
      dateBirth: new Date('2001-01-01'),
    })

    expect(result).not.toBeNull()
    expect(result?.missingPerson).toMatchObject({
      id: expect.any(String),
      contact_name: 'Emilia',
      contact_phone: '11999999999',
    })
  })

  it('should return null when person is not found', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      dateBirth: new Date('2001-01-01'),
    })
    expect(result).toBeNull()
  })

  it('should return null when name matches but birth date is different', async () => {
    await missingPeoplesRepository.create({
      name: 'John Doe',
      date_birth: new Date('2001-01-01'),
      lastSeenLocation: 'Praça da Sé',
      contact_name: 'Ana',
      contact_phone: '11999999999',
      userId: 'user-01',
      physical_description: null,
      clothes_description: null,
    })

    const result = await sut.execute({
      name: 'John Doe',
      dateBirth: new Date('1990-05-15'),
    })

    expect(result).toBeNull()
  })
})
