import { Router } from 'express'
import { fetchUserMissingPersonsController } from '@/domain/missing-person/http/controller/fetch-user-missing-persons-controller'
import { verifyJWT } from '@/middleware/verify-jwt'
import { getPersonByNameAndBirthController } from './get-person-by-name-and-birth-controller'
import { registerMissingPersonController } from './register-missing-person-controller'

export const missingPersonRoutes: Router = Router()

missingPersonRoutes.get('/', verifyJWT, getPersonByNameAndBirthController)
missingPersonRoutes.get('/me', verifyJWT, fetchUserMissingPersonsController)
missingPersonRoutes.post('/', verifyJWT, registerMissingPersonController)
