import request from 'supertest'
import { describe, expect, it } from 'vitest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-user-and-return-token'

describe('E2E - Get User Shelter', () => {
  it("Should be able find the user's shelters", async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app)
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

    const response = await request(app)
      .get('/shelters/me')
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toBe(200)
    expect(response.body.payload.shelter).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Abrigo test',
          address: 'Bangu Shopping',
        }),
      ]),
    )
  })
})
