import { beforeEach, describe, expect, it } from 'vitest'

import { PersonMatchService } from '@/domain/@services/person-match-service'
import { InMemoryCheckInsRepository } from '@/domain/check-in/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInShelterUseCase } from '@/domain/check-in/use-cases/check-in-shelter'
import { InMemoryMissingPeoplesRepository } from '@/domain/missing-person/repositories/in-memory/in-memory-missing-peoples-repository'
import { InMemorySheltersRepository } from '@/domain/shelter/repositories/in-memory/in-memory-shelters-repository'
import { ShelterNotFoundError } from '@/errors/shelter-not-found-error'

let missingPeoplesRepository: InMemoryMissingPeoplesRepository
let checkInsRepository: InMemoryCheckInsRepository
let sheltersRepository: InMemorySheltersRepository
let personMatchService: PersonMatchService
let sut: CheckInShelterUseCase

describe('Check In Shelter Use Case', () => {
  beforeEach(() => {
    missingPeoplesRepository = new InMemoryMissingPeoplesRepository()
    checkInsRepository = new InMemoryCheckInsRepository()
    sheltersRepository = new InMemorySheltersRepository()
    personMatchService = new PersonMatchService(
      missingPeoplesRepository,
      checkInsRepository,
    )
    sut = new CheckInShelterUseCase(
      checkInsRepository,
      sheltersRepository,
      missingPeoplesRepository,
      personMatchService,
    )
  })

  it('should be able to check-in', async () => {
    const shelter = await sheltersRepository.create({
      name: 'Abrigo Esperança',
      address: 'Rua Próxima, 123',
      latitude: -22.9068,
      longitude: -43.1729,
      capacity_max: 50,
      capacity_current: 0,
      userId: 'user-01',
    })

    const { checkInId, contactPerson } = await sut.execute({
      personName: 'John Doe',
      dateBirth: new Date('2000-01-01'),
      shelterId: shelter.id,
      userId: 'user-01',
    })

    expect(checkInId).toEqual(expect.any(String))
    expect(contactPerson).toBeNull()
  })

  it('should be able to check-in and return contact person find by name and birth', async () => {
    await missingPeoplesRepository.create({
      name: 'John Doe',
      date_birth: new Date('2000-01-01'),
      contact_name: 'Barbie Girl',
      contact_phone: '1234567890',
      userId: 'user-01',
      lastSeenLocation: 'Realengo - RJ',
    })

    const shelter = await sheltersRepository.create({
      name: 'Abrigo Esperança',
      address: 'Rua Próxima, 123',
      latitude: -22.9068,
      longitude: -43.1729,
      capacity_max: 50,
      capacity_current: 0,
      userId: 'user-01',
    })

    const { checkInId, contactPerson } = await sut.execute({
      personName: 'John Doe',
      dateBirth: new Date('2000-01-01'),
      shelterId: shelter.id,
      userId: 'user-02',
    })

    expect(checkInId).toEqual(expect.any(String))
    expect(contactPerson).toMatchObject({
      contactName: 'Barbie Girl',
      contactPhone: '1234567890',
    })
  })

  it('should be able to check-in and return contact person find by cpf', async () => {
    const cpfTest = '11111111111'

    await missingPeoplesRepository.create({
      name: 'John Doe.',
      date_birth: new Date('2000-01-01'),
      cpf: cpfTest,
      contact_name: 'Barbie Girl',
      contact_phone: '1234567890',
      userId: 'user-01',
      lastSeenLocation: 'Realengo - RJ',
    })

    const shelter = await sheltersRepository.create({
      name: 'Abrigo Esperança',
      address: 'Rua Próxima, 123',
      latitude: -22.9068,
      longitude: -43.1729,
      capacity_max: 50,
      capacity_current: 0,
      userId: 'user-01',
    })

    const { checkInId, contactPerson } = await sut.execute({
      personName: 'John Doe',
      dateBirth: new Date('2000-01-01'),
      cpf: cpfTest,
      shelterId: shelter.id,
      userId: 'user-02',
    })

    expect(checkInId).toEqual(expect.any(String))
    expect(contactPerson).toMatchObject({
      contactName: 'Barbie Girl',
      contactPhone: '1234567890',
    })
  })

  it('should throw ShelterNotFoundError when shelter does not exist', async () => {
    await expect(
      sut.execute({
        personName: 'John Doe',
        dateBirth: new Date('2000-01-01'),
        shelterId: 'shelter-not-exists',
        userId: 'user-01',
      }),
    ).rejects.toBeInstanceOf(ShelterNotFoundError)
  })
})
