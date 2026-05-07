import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import { PrismaClient } from "../../generated/prisma/client";
import { env } from "@/env";

const connectionString = env.DATABASE_URL
const url = new URL(connectionString)
const schema = url.searchParams.get('schema') ?? 'public'

const pool = new pg.Pool({connectionString})
const adapter = new PrismaPg(pool, {schema})

const prisma = new PrismaClient({
  adapter,
  log: process.env.NODE_ENV === "dev" ? ["query"] : [],
})

export { prisma }