import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // 1. Проверяем, что БД отвечает (делаем простой запрос)
    await prisma.$queryRaw`SELECT 1`;

    // 2. Проверяем наличие ключевых ENV-переменных
    const envChecks = {
      telegram: !!process.env.TELEGRAM_BOT_TOKEN,
      adminPassword: !!process.env.ADMIN_PASSWORD,
      leadsEnabled: process.env.NEXT_PUBLIC_ENABLE_LEADS === 'true',
    };

    // Если что-то критичное не настроено, можно вернуть 500, 
    // но пока просто покажем статус (чтобы не ломать локальную разработку)
    const isHealthy = envChecks.adminPassword; 

    return NextResponse.json(
      {
        status: isHealthy ? 'ok' : 'degraded',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        database: 'connected',
        env: envChecks,
      },
      { status: isHealthy ? 200 : 503 }
    );
  } catch (error) {
    console.error('[Healthcheck] Ошибка БД:', error);
    return NextResponse.json(
      {
        status: 'error',
        timestamp: new Date().toISOString(),
        database: 'disconnected',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}