import type { Request, Response } from 'express'
import z from 'zod'

import { makeRegisterUserUseCase } from '@/domain/user/use-cases/factories/make-register-user-use-case'

export async function registerUserController(
  request: Request,
  response: Response,
) {
  try {
    const registerUserBodySchema = z.object({
      name: z.string().min(3),
      email: z.string().email(),
      password: z.string().min(6),
    })

    const data = registerUserBodySchema.parse(request.body)

    const registerUserUseCase = makeRegisterUserUseCase()
    await registerUserUseCase.execute(data)

    return response.status(201).send()
  } catch (error) {
    console.error(error)

    if (error instanceof Error) {
      return response.status(400).send({ error: error.message })
    }
    return response.status(500).send({ error: 'Erro interno no servidor' })
  }
}
