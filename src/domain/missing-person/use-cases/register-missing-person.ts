import type { CheckIn } from 'generated/prisma/client'
import type { PersonMatchService } from '@/domain/@services/person-match-service'
import type { IMissingPeoplesRepository } from '@/domain/missing-person/repositories/IMissing-peoples-repository'

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
    const missingPersonId = await this.missingPeoplesRepository.create({
      ...data,
      date_birth: data.dateBirth,
      contact_name: data.contactName,
      contact_phone: data.contactPhone,
    })

    if (!missingPersonId) throw new Error('Missing person not created.')

    const { personSheltered } = await this.personMatchService.execute({
      name: data.name,
      dateBirth: data.dateBirth,
    })

    return {
      missingPersonId,
      personSheltered,
    }
  }
}
