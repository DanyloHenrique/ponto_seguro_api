import { Router } from 'express'
import { authenticateController } from './authenticate-controller'

export const authController: Router = Router()

authController.post('/', authenticateController)
