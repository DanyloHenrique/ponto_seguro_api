import { Router } from 'express'
import { getShelterController } from '@/domain/shelter/http/controller/get.controller'
import { nearbyController } from '@/domain/shelter/http/controller/nearby.controller'
import { createController } from '@/domain/shelter/http/controller/register.controller'
import { searchController } from '@/domain/shelter/http/controller/search.controller'
import { verifyJWT } from '@/middleware/verify-jwt'

export const shelterRoutes: Router = Router()

shelterRoutes.get('/nearby', nearbyController)
shelterRoutes.get('/search', searchController)
shelterRoutes.get('/:id', getShelterController)
shelterRoutes.post('/', verifyJWT, createController)
