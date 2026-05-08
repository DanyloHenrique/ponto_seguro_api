import { hash } from 'bcryptjs'
import request from 'supertest'
import { beforeEach, describe, expect, it } from 'vitest'
import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-user-and-return-token'

describe('E2E - Register Missing Person', () => {
  beforeEach(async () => {
    const user2 = await prisma.user.create({
      data: {
        name: 'user 2',
        email: 'user2@email.com',
        password_hash: await hash('123456', 6),
      },
    })
    const shelter = await prisma.shelter.create({
      data: {
        name: 'not search',
        address: 'Bangu Shopping',
        latitude: -22.8734331,
        longitude: -43.4691618,
        capacity_max: 50,
        capacity_current: 0,
        userId: user2.id,
      },
    })
    await prisma.checkIn.create({
      data: {
        shelterId: shelter.id,
        userId: user2.id,
        person_name: 'John Doe',
        date_birth: new Date('2001-07-10'),
      },
    })
  })

  it('Should be able register a missing person and return person sheltered', async () => {
    const { token } = await createAndAuthenticateUser(app)
    const response = await request(app)
      .post('/missing-peoples')
      .send({
        name: 'John Doe',
        dateBirth: '2001-07-10',
        lastSeenLocation: 'Rio de janeiro - RJ',
        contactName: 'Danylo Henrique',
        contactPhone: '99999999999',
      })
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toBe(201)
    expect(response.body.payload.missingPersonId).toEqual(expect.any(String))
    expect(response.body.payload.personSheltered).toMatchObject({
      person_name: 'John Doe',
      shelterId: expect.any(String),
    })
  })
})
