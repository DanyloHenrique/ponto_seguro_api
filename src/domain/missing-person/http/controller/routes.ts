import { Router } from 'express'
import { verifyJWT } from '@/middleware/verify-jwt'
import { getPersonByNameAndBirthController } from './get-person-by-name-and-birth-controller'
import { registerMissingPersonController } from './register-missing-person-controller'

export const missingPersonRoutes: Router = Router()

missingPersonRoutes.get('/', verifyJWT, getPersonByNameAndBirthController)
missingPersonRoutes.post('/', verifyJWT, registerMissingPersonController)
