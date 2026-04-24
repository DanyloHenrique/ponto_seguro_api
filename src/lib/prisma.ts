import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import { env } from "@/env";
import { PrismaClient } from "../../generated/prisma/client";

const connectionString = env.DATABASE_URL;

const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({
	adapter,
	log: env.NODE_ENV === "dev" ? ["query"] : [],
});

export { prisma };
