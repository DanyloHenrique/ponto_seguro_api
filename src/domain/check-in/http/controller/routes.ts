import { Router } from 'express'
import { checkInController } from './check-in-controller'

export const checkInRoutes: Router = Router()

checkInRoutes.post('/', checkInController)
