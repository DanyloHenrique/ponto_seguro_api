import type { Request, Response } from 'express'
import z from 'zod'

import { makeCheckInShelterUseCase } from '@/domain/check-in/use-cases/factories/make-check-in-shelter-use-cases'

export async function checkInController(request: Request, response: Response) {
  try {
    const checkInBodySchema = z.object({
      personName: z.string(),
      dateBirth: z.coerce.date(),
      shelterId: z.string().uuid(),
    })

    const { personName, dateBirth, shelterId } = checkInBodySchema.parse(
      request.body,
    )

    const userId = request.user.id

    const checkInShelterUseCase = makeCheckInShelterUseCase()

    const { checkInId, contactPerson } = await checkInShelterUseCase.execute({
      personName,
      dateBirth,
      shelterId,
      userId,
    })

    return response.status(201).send({
      payload: {
        checkInId,
        contactPerson,
      },
    })
  } catch (error) {
    console.error(error)

    if (error instanceof Error) {
      return response.status(400).send({ error: error.message })
    }

    return response.status(500).send({ error: 'Erro interno no servidor' })
  }
}
