import type { Request, Response } from 'express'
import z from 'zod'

import { makeSearchSheltersUseCase } from '../../use-cases/factories/make-get-shelters-use-cases'

export async function getShelterController(
  request: Request,
  response: Response,
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
    console.error(error)

    if (error instanceof Error) {
      return response.status(400).send({
        error: error.message,
      })
    }

    return response.status(500).send({
      error: 'Erro interno no servidor',
    })
  }
}
