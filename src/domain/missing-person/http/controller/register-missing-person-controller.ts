import type { Request, Response } from 'express'
import z from 'zod'

import { makeRegisterMissingPersonUseCase } from '@/domain/missing-person/use-cases/factories/make-register-missing-person-use-cases'

export async function registerMissingPersonController(
  request: Request,
  response: Response,
) {
  try {
    const registerMissingPersonBodySchema = z.object({
      name: z.string(),
      dateBirth: z.coerce.date(),
      physicalDescription: z.string().optional(),
      clothesDescription: z.string().optional(),
      lastSeenLocation: z.string(),
      contactName: z.string(),
      contactPhone: z.string().length(11),
    })

    const data = registerMissingPersonBodySchema.parse(request.body)
    const userId: string = request.user.id

    const registerMissingPersonUseCase = makeRegisterMissingPersonUseCase()

    const missingPersonCreated = await registerMissingPersonUseCase.execute({
      ...data,
      physicalDescription: data.physicalDescription ?? null,
      clothesDescription: data.clothesDescription ?? null,
      userId,
    })

    return response.status(201).send({ payload: missingPersonCreated })
  } catch (error) {
    console.error(error)

    if (error instanceof Error) {
      return response.status(400).send({ error: error.message })
    }
    return response.status(500).send({ error: 'Erro interno no servidor' })
  }
}
