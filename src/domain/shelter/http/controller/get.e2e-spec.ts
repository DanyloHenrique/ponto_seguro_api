import request from 'supertest'
import { describe, expect, it } from 'vitest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-user-and-return-token'

describe('E2E - Get Shelter', () => {
  it('Should be able get a shelter by id', async () => {
    const { token } = await createAndAuthenticateUser(app)

    //create a shelter
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

    //get shelter by id of the created shelter
    const shelterId = responseCreated.body.payload.id
    const response = await request(app)
      .get(`/shelters/${shelterId}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toBe(200)
    expect(response.body.payload.shelter).toEqual(
      expect.objectContaining({
        name: 'Abrigo test',
      }),
    )
  })
})
