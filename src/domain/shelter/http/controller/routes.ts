import { Router } from 'express'
import { verifyJWT } from '@/middleware/verify-jwt'
import { getShelterController } from './get.controller'
import { getUserShelterController } from './get-user-shelter.controller'
import { nearbyController } from './nearby.controller'
import { createController } from './register.controller'
import { searchController } from './search.controller'

export const shelterRoutes: Router = Router()

shelterRoutes.get('/nearby', nearbyController)
shelterRoutes.get('/search', verifyJWT, searchController)
shelterRoutes.get('/me', verifyJWT, getUserShelterController)
shelterRoutes.get('/:id', verifyJWT, getShelterController)
shelterRoutes.post('/', verifyJWT, createController)
