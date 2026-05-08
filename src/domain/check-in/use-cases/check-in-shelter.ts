import { createHash } from 'node:crypto'

import type { PersonMatchService } from '@/domain/@services/person-match-service'
import type { ICheckInsRepository } from '@/domain/check-in/repositories/ICheck-ins-repository'
import type { IMissingPeoplesRepository } from '@/domain/missing-person/repositories/IMissing-peoples-repository'
import type { ISheltersRepository } from '@/domain/shelter/repositories/IShelters-repository'
import { ShelterNotFoundError } from '@/errors/shelter-not-found-error'

interface CheckInShelterUseCaseRequest {
  personName: string
  dateBirth: Date
  cpf?: string | null
  shelterId: string
  userId: string
}

interface CheckInShelterUseCaseResponse {
  checkInId: string
  contactPerson: {
    contactName: string
    contactPhone: string
  } | null
}

export class CheckInShelterUseCase {
  constructor(
    private checkInsRepository: ICheckInsRepository,
    private sheltersRepository: ISheltersRepository,
    private missingPeoplesRepository: IMissingPeoplesRepository,
    private personMatchService: PersonMatchService,
  ) {}

  async execute({
    personName,
    dateBirth,
    cpf,
    shelterId,
    userId,
  }: CheckInShelterUseCaseRequest): Promise<CheckInShelterUseCaseResponse> {
    if (cpf) {
      cpf = createHash('sha256').update(cpf).digest('hex')
    }

    const { personMissing } = await this.personMatchService.execute({
      name: personName,
      dateBirth,
      cpf: cpf ?? null,
    })
    const shelter = await this.sheltersRepository.findById(shelterId)
    if (!shelter) throw new ShelterNotFoundError()

    const checkIn = await this.checkInsRepository.create({
      person_name: personName,
      date_birth: dateBirth,
      shelterId,
      userId,
      cpf: cpf ?? null,
    })

    await this.sheltersRepository.incrementCapacity(shelterId)

    if (personMissing) {
      await this.missingPeoplesRepository.updateShelter(
        personMissing.id,
        shelterId,
      )
    }

    return {
      checkInId: checkIn.id,
      contactPerson: personMissing
        ? {
            contactName: personMissing.contact_name,
            contactPhone: personMissing.contact_phone,
          }
        : null,
    }
  }
}
