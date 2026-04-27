import { beforeEach, describe, expect, it } from 'vitest'

import { PersonMatchService } from '@/domain/@services/person-match-service'
import { InMemoryCheckInsRepository } from '@/domain/check-in/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInShelterUseCase } from '@/domain/check-in/use-cases/check-in-shelter'
import { InMemoryMissingPeoplesRepository } from '@/domain/missing-person/repositories/in-memory/in-memory-missing-peoples-repository'

let missingPeoplesRepository: InMemoryMissingPeoplesRepository
let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckInShelterUseCase

describe('Check In Shelter Use Case', () => {
  beforeEach(() => {
    missingPeoplesRepository = new InMemoryMissingPeoplesRepository()
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckInShelterUseCase(
      checkInsRepository,
      new PersonMatchService(missingPeoplesRepository, checkInsRepository),
    )
  })

  it('should be able to check-in', async () => {
    const { checkInId, contactPerson } = await sut.execute({
      personName: 'John Doe',
      dateBirth: new Date('2000-01-01'),
      shelterId: 'shelter-01',
      userId: 'user-01',
    })

    expect(checkInId).toEqual(expect.any(String))
    expect(contactPerson).toBeNull()
  })

  it('should be able to check-in and return contact person', async () => {
    await missingPeoplesRepository.create({
      name: 'John Doe',
      date_birth: new Date('2000-01-01'),
      contact_name: 'Barbie Girl',
      contact_phone: '1234567890',
      userId: 'user-01',
      lastSeenLocation: 'Realengo - RJ',
    })

    const { checkInId, contactPerson } = await sut.execute({
      personName: 'John Doe',
      dateBirth: new Date('2000-01-01'),
      shelterId: 'shelter-01',
      userId: 'user-02',
    })

    expect(checkInId).toEqual(expect.any(String))
    expect(contactPerson).toEqual(
      expect.objectContaining({
        contactName: 'Barbie Girl',
        contactPhone: '1234567890',
      }),
    )
  })
})
