import { hash } from 'bcryptjs'
import request from 'supertest'
import { describe, expect, it } from 'vitest'
import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-user-and-return-token'

describe('E2E - Fetch User Missing Person', () => {
  it('Should be able fetch user missing persons', async () => {
    //creating a user and missing person that one should not fetch
    const user2 = await prisma.user.create({
      data: {
        name: 'user 2',
        email: 'user2@email.com',
        password_hash: await hash('123456', 6),
      },
    })
    await prisma.missingPerson.create({
      data: {
        name: 'Should Not Fetch',
        date_birth: new Date('2001-01-01'),
        lastSeenLocation: 'Rio de janeiro - RJ',
        contact_name: 'Danylo Henrique',
        contact_phone: '99999999999',
        userId: user2.id,
      },
    })

    // creating missing persons with token user correct that should appear in the search
    const { token } = await createAndAuthenticateUser(app)
    await request(app)
      .post('/missing-peoples')
      .send({
        name: 'John Doe',
        dateBirth: '2001-07-24',
        lastSeenLocation: 'Rio de janeiro - RJ',
        contactName: 'Danylo Henrique',
        contactPhone: '99999999999',
      })
      .set('Authorization', `Bearer ${token}`)

    await request(app)
      .post('/missing-peoples')
      .send({
        name: 'John Doe 2',
        dateBirth:'2001-07-10',
        lastSeenLocation: 'Rio de janeiro - RJ',
        contactName: 'Danylo Henrique',
        contactPhone: '99999999999',
      })
      .set('Authorization', `Bearer ${token}`)

    const response = await request(app)
      .get('/missing-peoples/me')
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toBe(200)
    expect(response.body.payload.length).toBe(2)
    expect(response.body.payload).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'John Doe' }),
        expect.objectContaining({ name: 'John Doe 2' }),
        expect.not.objectContaining({ name: 'Should Not Fetch' }),
      ]),
    )
  })
})
