import { PrismaClient } from '@prisma/client';
import { PrismaSqlite } from 'prisma-adapter-sqlite';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
    const adapter = new PrismaSqlite({
        url: 'file:./dev.db',
    });

    return new PrismaClient({
        adapter,
        log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}