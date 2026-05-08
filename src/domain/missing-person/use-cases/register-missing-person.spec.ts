import { beforeEach, describe, expect, it } from 'vitest'

import { PersonMatchService } from '@/domain/@services/person-match-service'
import { InMemoryCheckInsRepository } from '@/domain/check-in/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryMissingPeoplesRepository } from '@/domain/missing-person/repositories/in-memory/in-memory-missing-peoples-repository'
import { MissingPersonAlreadyRegisteredError } from '@/errors/missing-person-already-registered-error'
import { RegisterMissingPersonUseCase } from './register-missing-person'

let missingPeoplesRepository: InMemoryMissingPeoplesRepository
let checkInsRepository: InMemoryCheckInsRepository
let personMatchService: PersonMatchService
let sut: RegisterMissingPersonUseCase

describe('Register Missing Person Use Case', () => {
  beforeEach(() => {
    missingPeoplesRepository = new InMemoryMissingPeoplesRepository()
    checkInsRepository = new InMemoryCheckInsRepository()
    personMatchService = new PersonMatchService(
      missingPeoplesRepository,
      checkInsRepository,
    )
    sut = new RegisterMissingPersonUseCase(
      missingPeoplesRepository,
      personMatchService,
    )
  })

  it('should be able to register a missing person', async () => {
    const { missingPersonId } = await sut.execute({
      userId: 'user-01',
      name: 'John Doe',
      dateBirth: new Date('2001-01-01'),
      lastSeenLocation: 'Praça da Sé',
      contactName: 'Ana',
      contactPhone: '11999999999',
      physicalDescription: null,
      clothesDescription: null,
    })

    expect(missingPersonId).toEqual(expect.any(String))
  })

  it('should return personSheltered when there is a match', async () => {
    await checkInsRepository.create({
      person_name: 'John Doe',
      date_birth: new Date('2001-01-01'),
      shelterId: 'shelter-01',
      userId: 'user-01',
    })

    const { missingPersonId, personSheltered } = await sut.execute({
      userId: 'user-01',
      name: 'John Doe',
      dateBirth: new Date('2001-01-01'),
      lastSeenLocation: 'Praça da Sé',
      contactName: 'Emilia',
      contactPhone: '11999999999',
      physicalDescription: null,
      clothesDescription: null,
    })

    expect(missingPersonId).toEqual(expect.any(String))
    expect(personSheltered).toMatchObject({
      person_name: 'John Doe',
      shelterId: 'shelter-01',
    })
  })

  it('should return null personSheltered when there is no match', async () => {
    const { personSheltered } = await sut.execute({
      userId: 'user-01',
      name: 'John Doe',
      dateBirth: new Date('2001-01-01'),
      lastSeenLocation: 'Praça da Sé',
      contactName: 'Emilia',
      contactPhone: '11999999999',
      physicalDescription: null,
      clothesDescription: null,
    })

    expect(personSheltered).toBeNull()
  })

  it('should throw MissingPersonAlreadyRegisteredError when person is already registered', async () => {
    await sut.execute({
      userId: 'user-01',
      name: 'John Doe',
      dateBirth: new Date('2001-01-01'),
      lastSeenLocation: 'Praça da Sé',
      contactName: 'Emilia',
      contactPhone: '11999999999',
      physicalDescription: null,
      clothesDescription: null,
    })

    await expect(
      sut.execute({
        userId: 'user-01',
        name: 'John Doe',
        dateBirth: new Date('2001-01-01'),
        lastSeenLocation: 'Praça da Sé',
        contactName: 'Emilia',
        contactPhone: '11999999999',
        physicalDescription: null,
        clothesDescription: null,
      }),
    ).rejects.toBeInstanceOf(MissingPersonAlreadyRegisteredError)
  })
})
