// scripts/cleanup-test-schemas.ts
import { Client } from 'pg'
import 'dotenv/config'

async function cleanup() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  })

  try {
    await client.connect()

    const res = await client.query(`
      SELECT schema_name 
      FROM information_schema.schemata 
      WHERE schema_name ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
    `)

    const schemas = res.rows.map((row) => row.schema_name)

    if (schemas.length === 0) {
      console.log('✅ Nenhum schema órfão encontrado.')
      return
    }

    console.log(`🧹 Removendo ${schemas.length} schemas de teste...`)

    for (const schema of schemas) {
      await client.query(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`)
      console.log(`   - ${schema} removido.`)
    }

    console.log('✨ Banco de dados limpo!')
  } catch (err) {
    console.error('❌ Erro ao limpar schemas:', err)
  } finally {
    await client.end()
  }
}

cleanup()
