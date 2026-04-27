import type { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import z from 'zod'

import { makeAuthenticateUseCase } from '@/domain/auth/use-cases/factories/make-authenticate-use-cases'
import { env } from '@/env'

export async function authenticateController(
  request: Request,
  response: Response,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })
  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()

    const { user } = await authenticateUseCase.execute({ email, password })

    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET, {
      expiresIn: '1d',
    })

    return response.status(200).send({ token })
  } catch (error) {
    console.error(error)

    if (error instanceof Error) {
      return response.status(400).send({ error: error.message })
    }
    return response.status(500).send({ error: 'Erro interno no servidor' })
  }
}
