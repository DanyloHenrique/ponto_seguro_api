import request from 'supertest'
import { describe, expect, it } from 'vitest'
import { app } from '@/app'

describe('E2E - Register User', () => {
  it('should be able register user', async () => {

    const response = await request(app).post('/users').send({
      name: 'John Doe',
      email: 'emilycecli@example.com',
      password: '123456',
    })

    expect(response.status).toBe(201)
  })
})
