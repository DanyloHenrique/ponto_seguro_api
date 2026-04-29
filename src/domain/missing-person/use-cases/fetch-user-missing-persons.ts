import type { MissingPerson } from 'generated/prisma/client'
import type { IMissingPeoplesRepository } from '@/domain/missing-person/repositories/IMissing-peoples-repository'

type FetchUserMissingPersonsUseCasesRequest = {
  userId: string
}
type FetchUserMissingPersonsUseCasesResponse = {
  missingPersons: MissingPerson[]
}

export class FetchUserMissingPersonsUseCases {
  constructor(private missingPeoplesRepository: IMissingPeoplesRepository) {}

  async execute({
    userId,
  }: FetchUserMissingPersonsUseCasesRequest): Promise<FetchUserMissingPersonsUseCasesResponse> {
    const missingPersons =
      await this.missingPeoplesRepository.fetchByUserId(userId)

    return {
      missingPersons,
    }
  }
}
