import request from 'supertest'
import { describe, expect, it } from 'vitest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-user-and-return-token'

describe('E2E - Get Person By Name And Birth', () => {
  it('Should be able get a person by name and birth', async () => {

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

    const response = await request(app)
      .get('/missing-peoples')
      .query({ name: 'John Doe', dateBirth: '2001-07-24' })
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toBe(200)
    expect(response.body.payload.missingPerson.id).toEqual(expect.any(String))
  })
})
