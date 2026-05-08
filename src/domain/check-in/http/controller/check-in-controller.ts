import type { NextFunction, Request, Response } from 'express'
import z from 'zod'

import { makeCheckInShelterUseCase } from '@/domain/check-in/use-cases/factories/make-check-in-shelter-use-cases'

export async function checkInController(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const checkInBodySchema = z.object({
      personName: z.string(),
      dateBirth: z.coerce.date(),
      cpf: z.string().length(11).optional(),
      shelterId: z.string().uuid(),
    })

    const { personName, dateBirth, shelterId, cpf } = checkInBodySchema.parse(
      request.body,
    )

    const userId = request.user.id

    const checkInShelterUseCase = makeCheckInShelterUseCase()

    const { checkInId, contactPerson } = await checkInShelterUseCase.execute({
      personName,
      dateBirth,
      cpf: cpf ?? null,
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
    next(error)
  }
}
