import { Router } from 'express'

import { getPersonByNameAndBirthController } from './get-person-by-name-and-birth-controller'
import { registerMissingPersonController } from './register-missing-person-controller'

export const missingPersonRoutes: Router = Router()

missingPersonRoutes.get('/', getPersonByNameAndBirthController)
missingPersonRoutes.post('/', registerMissingPersonController)
