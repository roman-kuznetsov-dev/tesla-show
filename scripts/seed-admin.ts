import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaSqlite } from 'prisma-adapter-sqlite';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

async function main() {
  const adapter = new PrismaSqlite({
    url: 'file:./dev.db',
  });

  const prisma = new PrismaClient({ adapter });

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.error('❌ Укажи ADMIN_EMAIL и ADMIN_PASSWORD в .env');
    process.exit(1);
  }

  const existingUser = await prisma.adminUser.findUnique({ where: { email } });
  if (existingUser) {
    console.log('✅ Админ с таким email уже существует');
    await prisma.$disconnect();
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.adminUser.create({
    data: {
      email,
      passwordHash,
      role: 'ADMIN',
    },
  });

  console.log(`✅ Админ создан: ${email}`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});