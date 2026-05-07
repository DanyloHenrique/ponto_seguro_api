import request from 'supertest'
import { describe, expect, it } from 'vitest'
import { app } from '@/app'
import { env } from '@/env'

describe('E2E - Register User', () => {
  it('should be able register user', async () => {
    console.log('env:', env.DATABASE_URL)
    console.log('process:', process.env.DATABASE_URL)

    const response = await request(app).post('/users').send({
      name: 'John Doe',
      email: 'emilycecli@example.com',
      password: '123456',
    })
    console.log('🚀 ~ response:', response.data)

    expect(response.status).toBe(201)
  })
})
