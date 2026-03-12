import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

/**
 * Get the Prisma client instance
 * @returns PrismaClient instance
 */
export function getPrismaClient(): PrismaClient {
  return prisma;
}

/**
 * Gracefully shutdown Prisma client
 */
export async function disconnectPrisma(): Promise<void> {
  await prisma.$disconnect();
}
