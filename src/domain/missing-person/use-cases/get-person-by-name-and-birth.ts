import type { MissingPerson } from 'generated/prisma/client'
import type { IMissingPeoplesRepository } from '@/domain/missing-person/repositories/IMissing-peoples-repository'

interface getPersonByNameAndBirthUseCaseRequest {
  name: string
  dateBirth: Date
}

interface getPersonByNameAndBirthUseCaseResponse {
  missingPerson?: MissingPerson
}

export class GetPersonByNameAndBirthUseCase {
  constructor(private missingPeoplesRepository: IMissingPeoplesRepository) {}

  async execute({
    name,
    dateBirth,
  }: getPersonByNameAndBirthUseCaseRequest): Promise<getPersonByNameAndBirthUseCaseResponse | null> {
    const missingPerson = await this.missingPeoplesRepository.getByNameAndBirth(
      name,
      dateBirth,
    )

    if (!missingPerson) return null

    return { missingPerson }
  }
}
