import type { PersonMatchService } from '@/domain/@services/person-match-service'
import type { ICheckInsRepository } from '@/domain/check-in/repositories/ICheck-ins-repository'
import type { IMissingPeoplesRepository } from '@/domain/missing-person/repositories/IMissing-peoples-repository'
import type { ISheltersRepository } from '@/domain/shelter/repositories/IShelters-repository'

interface CheckInShelterUseCaseRequest {
  personName: string
  dateBirth: Date
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
    shelterId,
    userId,
  }: CheckInShelterUseCaseRequest): Promise<CheckInShelterUseCaseResponse> {
    const checkIn = await this.checkInsRepository.create({
      person_name: personName,
      date_birth: dateBirth,
      shelterId,
      userId,
    })

    if (!checkIn) {
      throw new Error('Check-in not created')
    }

    await this.sheltersRepository.incrementCapacity(shelterId)

    const { personMissing } = await this.personMatchService.execute({
      name: personName,
      dateBirth,
    })

    if (!personMissing) {
      return {
        checkInId: checkIn.id,
        contactPerson: null,
      }
    }

    await this.missingPeoplesRepository.updateShelter(
      personMissing.id,
      shelterId,
    )

    return {
      checkInId: checkIn.id,
      contactPerson: {
        contactName: personMissing.contact_name,
        contactPhone: personMissing.contact_phone,
      },
    }
  }
}
