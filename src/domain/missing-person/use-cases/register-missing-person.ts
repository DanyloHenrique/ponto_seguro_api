import type { CheckIn } from 'generated/prisma/client'
import type { PersonMatchService } from '@/domain/@services/person-match-service'
import type { IMissingPeoplesRepository } from '@/domain/missing-person/repositories/IMissing-peoples-repository'
import { MissingPersonAlreadyRegisteredError } from '@/errors/missing-person-already-registered-error'

interface RegisterMissingPersonUseCaseRequest {
  userId: string
  name: string
  dateBirth: Date
  physicalDescription: string | null
  clothesDescription: string | null
  lastSeenLocation: string
  contactName: string
  contactPhone: string
}

interface RegisterMissingPersonUseCaseResponse {
  missingPersonId: string
  personSheltered: CheckIn | null
}

export class RegisterMissingPersonUseCase {
  constructor(
    private missingPeoplesRepository: IMissingPeoplesRepository,
    private personMatchService: PersonMatchService,
  ) {}

  async execute(
    data: RegisterMissingPersonUseCaseRequest,
  ): Promise<RegisterMissingPersonUseCaseResponse> {
    const alreadyRegistered =
      await this.missingPeoplesRepository.getByNameAndBirth(
        data.name,
        data.dateBirth,
      )

    if (alreadyRegistered) throw new MissingPersonAlreadyRegisteredError()

    const { personSheltered } = await this.personMatchService.execute({
      name: data.name,
      dateBirth: data.dateBirth,
    })

    const missingPersonId = await this.missingPeoplesRepository.create({
      userId: data.userId,
      name: data.name,
      date_birth: data.dateBirth,
      contact_name: data.contactName,
      contact_phone: data.contactPhone,
      physical_description: data.physicalDescription,
      clothes_description: data.clothesDescription,
      lastSeenLocation: data.lastSeenLocation,
      shelterId: personSheltered?.shelterId ?? null,
    })

    if (!personSheltered) return { missingPersonId, personSheltered: null }

    return {
      missingPersonId,
      personSheltered,
    }
  }
}
