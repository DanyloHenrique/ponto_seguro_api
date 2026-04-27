import type { CheckIn, MissingPerson } from 'generated/prisma/client'
import type { ICheckInsRepository } from '@/domain/check-in/repositories/ICheck-ins-repository'
import type { IMissingPeoplesRepository } from '@/domain/missing-person/repositories/IMissing-peoples-repository'

interface PersonMatchServiceRequest {
  name: string
  dateBirth: Date
}

interface PersonMatchServiceResponse {
  personMissing: MissingPerson | null
  personSheltered: CheckIn | null
}

export class PersonMatchService {
  constructor(
    private missingPeoplesRepository: IMissingPeoplesRepository,
    private checkInsRepository: ICheckInsRepository,
  ) {}

  async execute({
    name,
    dateBirth,
  }: PersonMatchServiceRequest): Promise<PersonMatchServiceResponse> {
    const [personMissing, personSheltered] = await Promise.all([
      this.missingPeoplesRepository.getByNameAndBirth(name, dateBirth),
      this.checkInsRepository.getByNameAndBirth(name, dateBirth),
    ])

    return {
      personMissing: personMissing ?? null,
      personSheltered: personSheltered ?? null,
    }
  }
}
