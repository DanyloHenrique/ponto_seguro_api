import request from 'supertest'
import { describe, expect, it } from 'vitest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-user-and-return-token'

describe('E2E - Register Shelter', () => {
  it('Should be able register a missing person', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const response = await request(app)
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

    expect(response.statusCode).toBe(201)
    expect(response.body.payload.id).toEqual(expect.any(String))
  })
})
