import type { NextFunction, Request, Response } from 'express'
import z from 'zod'
import { makeFetchNearbySheltersUseCase } from '@/domain/shelter/use-cases/factories/make-fetch-nearby-shelters-use-cases'

export async function nearbyController(req: Request, res: Response, next: NextFunction) {
  const nearbySheltersBodySchema = z.object({
    latitude: z.coerce.number().refine((value: number) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine((value: number) => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude, longitude } = nearbySheltersBodySchema.parse(req.query)

  try {
    const fetchNearbySheltersUseCase = makeFetchNearbySheltersUseCase()

    const { shelters } = await fetchNearbySheltersUseCase.execute({
      latitude,
      longitude,
    })

    return res.status(200).send({ shelters })
  } catch (error) {
    next(error)
  }
}
