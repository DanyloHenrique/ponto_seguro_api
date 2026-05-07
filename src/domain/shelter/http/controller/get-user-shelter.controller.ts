import type { NextFunction, Request, Response } from 'express'
import { makeGetUserShelterUseCase } from '@/domain/shelter/use-cases/factories/make-get-user-shelter-use-cases'

export async function getUserShelterController(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const userId = request.user.id

    const getUserShelterUseCases = makeGetUserShelterUseCase()
    const shelters = await getUserShelterUseCases.execute({
      userId,
    })

    return response.status(200).send({
      payload: shelters,
    })
  } catch (error) {
    next(error)
  }
}
