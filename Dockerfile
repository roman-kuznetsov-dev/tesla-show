# ===== Этап 1: Установка зависимостей =====
FROM node:24-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
COPY prisma ./prisma
COPY prisma.config.ts ./

RUN npm ci

# ===== Этап 2: Сборка =====
FROM node:24-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Генерируем Prisma Client
RUN npx prisma generate

# Переменные для сборки (встраиваются в бандл)
ARG NEXT_PUBLIC_ENABLE_LEADS=false
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_YM_ID
ENV NEXT_PUBLIC_ENABLE_LEADS=$NEXT_PUBLIC_ENABLE_LEADS
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_YM_ID=$NEXT_PUBLIC_YM_ID

RUN npm run build

# ===== Этап 3: Запуск =====
FROM node:24-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Копируем статику и билд
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Копируем Prisma (для работы адаптера)
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./

# Создаём папку для БД (volume)
RUN mkdir -p /app/data && chown -R nextjs:nodejs /app/data

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]