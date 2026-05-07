import { hashSync } from 'bcryptjs'
import request from 'supertest'
import { describe, expect, it } from 'vitest'
import { app } from '@/app'
import { prisma } from '@/lib/prisma'

describe('E2E - Authenticate User', () => {
  it('Should be able authenticate user created and get token', async () => {
    const objTest = {
      name: 'danylo henrique',
      email: 'danylotest@test.com',
      password: '123456',
    }

    await prisma.user.create({
      data: {
        name: objTest.name,
        email: objTest.email,
        password_hash: hashSync(objTest.password, 6),
      },
    })

    const result = await request(app).post('/sessions').send({
      email: objTest.email,
      password: objTest.password,
    })

    expect(result.statusCode).toBe(200)
    expect(result.body.token).toEqual(expect.any(String))
  })
})
