import cors from 'cors'
import express, {
  type Application,
  type ErrorRequestHandler,
  type NextFunction,
  type Request,
  type Response,
} from 'express'

import z, { ZodError } from 'zod'
import { authController } from '@/domain/auth/controller/routes'
import { userRoutes } from '@/domain/user/controller/routes'
import { env } from '@/env'
import { checkInRoutes } from './domain/check-in/http/controller/routes'
import { missingPersonRoutes } from './domain/missing-person/http/controller/routes'
import { shelterRoutes } from './domain/shelter/http/controller/routes'

const app: Application = express()

app.use(cors())
app.use(express.json())

app.get('/ping', (_request, response) => {
  return response.send({ message: 'pong' })
})

app.use('/shelters', shelterRoutes)
app.use('/missing-peoples', missingPersonRoutes)
app.use('/check-ins', checkInRoutes)
app.use('/users', userRoutes)
app.use('/sessions', authController)

app.use(
  (
    error: ErrorRequestHandler,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    if (env.NODE_ENV !== 'production') {
      console.error(error)
    }

    if (error instanceof ZodError) {
      return res.status(400).send({
        message: 'Validation Error.',
        issues: z.treeifyError(error),
      })
    }

    if (error instanceof Error) {
      return res.status(400).send({ message: error.message })
    }

    res.status(500).send({ message: 'Erro interno do servidor' })
  },
)

export { app }
