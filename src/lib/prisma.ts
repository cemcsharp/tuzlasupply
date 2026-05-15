import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prismaClientSingleton = () => {
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    console.error("CRITICAL: DATABASE_URL is missing!");
    return new PrismaClient(); // Fallback to default (might fail but prevents crash during init)
  }

  try {
    const pool = new Pool({ 
      connectionString,
      max: 1, // Serverless için düşük tutmak daha sağlıklıdır
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
    });
    const adapter = new PrismaPg(pool);
    return new PrismaClient({ adapter });
  } catch (error) {
    console.error("Prisma Initialization Error:", error);
    return new PrismaClient();
  }
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
