import type { NextFunction, Request, Response } from 'express'
import z from 'zod'

import { makeSearchSheltersUseCase } from '../../use-cases/factories/make-get-shelters-use-cases'

export async function getShelterController(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const getShelterSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getShelterSchema.parse(request.params)

    const getShelterUseCase = makeSearchSheltersUseCase()

    const shelter = await getShelterUseCase.execute({
      id,
    })

    if (!shelter) {
      return response.status(404).send({
        message: 'Abrigo não encontrado',
      })
    }

    return response.status(200).send({
      payload: shelter,
    })
  } catch (error) {
    next(error)
  }
}
