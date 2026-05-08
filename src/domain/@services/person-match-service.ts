import type { CheckIn, MissingPerson } from 'generated/prisma/client'
import type { ICheckInsRepository } from '@/domain/check-in/repositories/ICheck-ins-repository'
import type { IMissingPeoplesRepository } from '@/domain/missing-person/repositories/IMissing-peoples-repository'

interface PersonMatchServiceRequest {
  name: string
  dateBirth: Date
  cpf?: string | null
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
    cpf,
  }: PersonMatchServiceRequest): Promise<PersonMatchServiceResponse> {
    const [personMissing, personSheltered] = await Promise.all([
      this.missingPeoplesRepository.getByNameAndBirthOrCpf(
        name,
        dateBirth,
        cpf ?? null,
      ),
      this.checkInsRepository.getByNameAndBirthOrCpf(
        name,
        dateBirth,
        cpf ?? null,
      ),
    ])

    return {
      personMissing: personMissing ?? null,
      personSheltered: personSheltered ?? null,
    }
  }
}
