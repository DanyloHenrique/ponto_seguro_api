import { hash } from 'bcryptjs'
import type { Application } from 'express'
import request from 'supertest'
import { prisma } from '@/lib/prisma'

export async function createAndAuthenticateUser(app: Application) {
  await prisma.user.create({
    data: {
      name: 'danylo',
      email: 'danylo@test.com',
      password_hash: await hash('123456', 6),
    },
  })

  const authenticateResponse = await request(app).post('/sessions').send({
    email: 'danylo@test.com',
    password: '123456',
  })

  const { token } = authenticateResponse.body

  return { token }
}
