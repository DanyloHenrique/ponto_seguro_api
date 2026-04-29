import type { Request, Response } from 'express'
import z from 'zod'

import { MakeFetchUserMissingPersonsUseCases } from '../../use-cases/factories/make-fetch-user-missing-persons-use-cases'

export async function fetchUserMissingPersonsController(
  request: Request,
  response: Response,
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
    console.error(error)

    if (error instanceof Error) {
      return response.status(400).send({
        error: error.message,
      })
    }

    return response.status(500).send({
      message: 'Erro interno no servidor',
      error: error,
    })
  }
}
