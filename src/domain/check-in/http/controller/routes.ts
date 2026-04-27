import { Router } from 'express'
import { verifyJWT } from '@/middleware/verify-jwt'
import { checkInController } from './check-in-controller'

export const checkInRoutes: Router = Router()

checkInRoutes.post('/', verifyJWT, checkInController)
