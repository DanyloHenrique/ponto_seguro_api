import express, { type Application } from 'express'

import { authController } from '@/domain/auth/controller/routes'
import { userRoutes } from '@/domain/user/controller/routes'
import { checkInRoutes } from './domain/check-in/http/controller/routes'
import { missingPersonRoutes } from './domain/missing-person/http/controller/routes'
import { shelterRoutes } from './domain/shelter/http/controller/routes'

const app: Application = express()

app.use(express.json())

app.get('/ping', (_request, response) => {
  return response.send({ message: 'pong' })
})

app.use('/shelters', shelterRoutes)
app.use('/missing-peoples', missingPersonRoutes)
app.use('/check-in', checkInRoutes)
app.use('/users', userRoutes)
app.use('/sessions', authController)

export { app }
