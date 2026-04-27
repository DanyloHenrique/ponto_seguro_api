import type { Request, Response } from 'express'
import z from 'zod'

import { makeGetPersonByNameAndBirthUseCase } from '@/domain/missing-person/use-cases/factories/make-get-person-by-name-and-birth-use-cases'

export async function getPersonByNameAndBirthController(
  request: Request,
  response: Response,
) {
  try {
    const getPersonSchema = z.object({
      name: z.string(),
      dateBirth: z.coerce.date(),
    })

    const { name, dateBirth } = getPersonSchema.parse(request.query)

    const getPersonByNameAndBirthUseCase = makeGetPersonByNameAndBirthUseCase()

    const missingPerson = await getPersonByNameAndBirthUseCase.execute({
      name,
      dateBirth,
    })
    if (!missingPerson)
      return response.status(404).send({ message: 'Pessoa não encontrada' })

    return response.status(200).send({ payload: missingPerson })
  } catch (error) {
    console.error(error)

    if (error instanceof Error) {
      return response.status(400).send({ error: error.message })
    }
    return response.status(500).send({ error: 'Erro interno no servidor' })
  }
}
