import { hash } from 'bcryptjs'
import request from 'supertest'
import { describe, expect, it } from 'vitest'
import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-user-and-return-token'

describe('E2E - Check In', () => {
  it('Should be able make check-in a shelter', async () => {
    //create user and register missing person
    const user2 = await prisma.user.create({
      data: {
        name: 'user 2',
        email: 'user2@email.com',
        password_hash: await hash('123456', 6),
      },
    })
    await prisma.missingPerson.create({
      data: {
        name: 'John Doe',
        date_birth: new Date('2001-07-24'),
        lastSeenLocation: 'Rio de janeiro - RJ',
        contact_name: 'Danylo Henrique',
        contact_phone: '99999999999',
        userId: user2.id,
      },
    })

    const { token } = await createAndAuthenticateUser(app)
    const responseCreated = await request(app)
      .post('/shelters')
      .send({
        name: 'Abrigo test',
        address: 'Bangu Shopping',
        latitude: -22.8734331,
        longitude: -43.4691618,
        capacity_max: 50,
        capacity_current: 0,
      })
      .set('Authorization', `Bearer ${token}`)
    const shelterId = responseCreated.body.payload.id

    const response = await request(app)
      .post('/check-ins')
      .send({
        personName: 'John Doe',
        dateBirth: '2001-07-24',
        shelterId: shelterId,
      })
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toBe(201)
    expect(response.body.payload.checkInId).toEqual(expect.any(String))
    expect(response.body.payload.contactPerson).toEqual({
      contactName: 'Danylo Henrique',
      contactPhone: '99999999999',
    })
  })
})
