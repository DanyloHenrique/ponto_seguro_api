import { PrismaSheltersRepository } from '@/domain/shelter/repositories/prisma/prisma-shelters-repository'
import {GetUserShelterUseCase} from '../get-user-shelter'


export function makeGetUserShelterUseCase() {
  const prismaSheltersRepository = new PrismaSheltersRepository()
  const getUserShelterUseCase = new GetUserShelterUseCase(prismaSheltersRepository)
  return getUserShelterUseCase
}
