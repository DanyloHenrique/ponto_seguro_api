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
    const { personMissing } = await this.personMatchService.execute({
      name: personName,
      dateBirth,
    })
    const shelter = await this.sheltersRepository.findById(shelterId)
    if (!shelter) throw new ShelterNotFoundError()
      
    const checkIn = await this.checkInsRepository.create({
      person_name: personName,
      date_birth: dateBirth,
      shelterId,
      userId,
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
