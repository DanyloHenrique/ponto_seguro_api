import { beforeEach, describe, expect, it } from 'vitest'

import { PersonMatchService } from '@/domain/@services/person-match-service'
import { InMemoryCheckInsRepository } from '@/domain/check-in/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryMissingPeoplesRepository } from '@/domain/missing-person/repositories/in-memory/in-memory-missing-peoples-repository'

let missingPeoplesRepository: InMemoryMissingPeoplesRepository
let checkInsRepository: InMemoryCheckInsRepository
let sut: PersonMatchService

describe('Person Match Service', () => {
  beforeEach(() => {
    missingPeoplesRepository = new InMemoryMissingPeoplesRepository()
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new PersonMatchService(missingPeoplesRepository, checkInsRepository)
  })

  it('should return null for both when no match is found', async () => {
    await missingPeoplesRepository.create({
      id: 'missing-01',
      name: 'Max Steal',
      date_birth: new Date('1985-10-10'),
      lastSeenLocation: 'Praça da Sé',
      contact_name: 'Barbie Girl',
      contact_phone: '11999999999',
      userId: 'user-01',
    })

    await checkInsRepository.create({
      id: 'checkin-01',
      person_name: 'John Doe',
      date_birth: new Date('1970-01-01'),
      shelterId: 'shelter-01',
      userId: 'user-created-shelter-01',
    })

    const result = await sut.execute({
      name: 'João Silva',
      dateBirth: new Date('1990-05-15'),
    })

    expect(result.personMissing).toBeNull()
    expect(result.personSheltered).toBeNull()
  })

  it('should be able to find a missing person', async () => {
    await missingPeoplesRepository.create({
      id: 'missing-01',
      name: 'John Dow',
      date_birth: new Date('2001-01-01'),
      lastSeenLocation: 'Praça da Sé',
      contact_name: 'Barbie Girl',
      contact_phone: '11999999999',
      userId: 'user-01',
    })

    const result = await sut.execute({
      name: 'John Dow',
      dateBirth: new Date('2001-01-01'),
    })

    expect(result.personMissing).toEqual(
      expect.objectContaining({
        name: 'John Dow',
        contact_name: 'Barbie Girl',
        contact_phone: '11999999999',
      }),
    )
    expect(result.personSheltered).toBeNull()
  })

  it('should be able to find a sheltered person', async () => {
    await checkInsRepository.create({
      id: 'checkin-01',
      person_name: 'John Doe',
      date_birth: new Date('2001-01-01'),
      shelterId: 'shelter-01',
      userId: 'user-01',
    })

    const result = await sut.execute({
      name: 'John Doe',
      dateBirth: new Date('2001-01-01'),
    })

    expect(result.personSheltered).toEqual(
      expect.objectContaining({
        person_name: 'John Doe',
      }),
    )
    expect(result.personMissing).toBeNull()
  })

  it('should not return a match when name is the same but birth date is different', async () => {
    const commonName = 'John Doe'

    await missingPeoplesRepository.create({
      id: 'missing-01',
      name: commonName,
      date_birth: new Date('2000-01-01'),
      lastSeenLocation: 'Praça da Sé',
      contact_name: 'Ana',
      contact_phone: '11999999999',
      userId: 'user-01',
    })

    await checkInsRepository.create({
      id: 'checkin-01',
      person_name: commonName,
      date_birth: new Date('1980-05-15'),
      shelterId: 'shelter-01',
      userId: 'user-01',
    })

    const result = await sut.execute({
      name: commonName,
      dateBirth: new Date('1992-08-10'),
    })

    expect(result.personMissing).toBeNull()
    expect(result.personSheltered).toBeNull()
  })
})
