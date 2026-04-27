import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { env } from '@/env'

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string
      }
    }
  }
}

export async function verifyJWT(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const token = request.header('Authorization')?.replace('Bearer ', '')

  if (!token) {
    return response.status(401).send({ message: 'Not token.' })
  }
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as { sub: string }

    request.user = { id: decoded.sub }
    next()
  } catch (err) {
    console.error('verify-jwt', err)
    return response.status(401).send({ message: 'Unauthorized.' })
  }
}
