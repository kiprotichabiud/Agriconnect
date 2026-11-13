import "server-only";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";
import { isDatabaseConfigured } from "@/lib/env";

const globalForPrisma = globalThis as typeof globalThis & {
  agriConnectPrisma?: PrismaClient;
};

export function getPrismaClient(): PrismaClient | null {
  const databaseUrl = process.env.DATABASE_URL;

  if (!isDatabaseConfigured() || !databaseUrl) {
    return null;
  }

  if (!globalForPrisma.agriConnectPrisma) {
    const adapter = new PrismaPg({ connectionString: databaseUrl });
    globalForPrisma.agriConnectPrisma = new PrismaClient({ adapter });
  }

  return globalForPrisma.agriConnectPrisma;
}
