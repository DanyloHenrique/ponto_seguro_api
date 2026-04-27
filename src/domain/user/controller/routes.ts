import { Router } from 'express'
import { registerUserController } from './register-user-controller'

export const userRoutes: Router = Router()

userRoutes.post('/', registerUserController)
