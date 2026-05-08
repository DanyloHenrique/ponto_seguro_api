import type { NextFunction, Request, Response } from 'express'

import { MakeFetchUserMissingPersonsUseCases } from '../../use-cases/factories/make-fetch-user-missing-persons-use-cases'

export async function fetchUserMissingPersonsController(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const userId = request.user.id

    const fetchUserMissingPersonsUseCases =
      MakeFetchUserMissingPersonsUseCases()

    const { missingPersons } = await fetchUserMissingPersonsUseCases.execute({
      userId,
    })

    return response.status(200).send({
      payload: missingPersons,
    })
  } catch (error) {
    next(error)
  }
}
