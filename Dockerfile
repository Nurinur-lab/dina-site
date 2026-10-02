# Multi-stage сборка Next.js в standalone-режиме (CLAUDE.md, раздел 9).
# Образ запускается от непривилегированного пользователя, итоговый слой — только
# то, что нужно для рантайма (standalone-сервер + статика), без исходников и node_modules.

FROM node:22-alpine AS base

# ---- deps: ставим зависимости отдельным слоем, чтобы кэшироваться между сборками ----
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ---- builder: собираем приложение ----
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Включает output: "standalone" в next.config.ts — без этого флага сборка обычная,
# непригодная для копирования в минимальный рантайм-образ (см. PROGRESS.md, фаза 0).
ENV BUILD_STANDALONE=1
ENV NEXT_TELEMETRY_DISABLED=1

ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_YM_ID
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}
ENV NEXT_PUBLIC_YM_ID=${NEXT_PUBLIC_YM_ID}

RUN npm run build

# ---- runner: минимальный рантайм-образ ----
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

# public/ и .next/static копируются отдельно от standalone-бандла — так их
# раскладывает `next build` при output: "standalone" (см. документацию Next.js).
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
