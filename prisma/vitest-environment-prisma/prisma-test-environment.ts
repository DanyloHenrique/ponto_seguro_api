import 'dotenv/config'
import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import pg from 'pg'
import type { Environment } from 'vitest/environments'

function generateDatabaseUrl(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL env variables.')
  }

  const url = new URL(process.env.DATABASE_URL)
  url.searchParams.set('schema', schema)

  return url.toString()
}

export default (<Environment>{
  name: 'prisma',
  viteEnvironment: 'ssr',

  async setup() {
    //create bd for tests
    const schema = randomUUID()
    const databaseUrl = generateDatabaseUrl(schema)
    process.env.DATABASE_URL = databaseUrl

    execSync('prisma migrate deploy', { stdio: 'ignore' })

    return {
      async teardown() {
        //delete bd for tests
        const client = new pg.Client({
          connectionString: databaseUrl,
        })

        await client.connect()
        await client.query(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`)

        await client.end() // Fecha a conexão
      },
    }
  },
})
