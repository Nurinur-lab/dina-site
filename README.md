# Сайт ИФК «Дина»

Премиальный сайт-наследие исторического футзального клуба «Дина» (Москва): масштаб клуба →
история → титулы → легенды → место в истории российского футзала. Подробности замысла,
дизайн-системы и жёстких правил по контенту — в [`CLAUDE.md`](./CLAUDE.md).

## Стек

- **Next.js 16** (App Router, Turbopack), **React 19**, **TypeScript** (strict)
- **Tailwind CSS v4** с токенами дизайн-системы в `src/app/globals.css`
- **Zod** — схемы и валидация всего контента в `content/*.json`
- **motion** (`motion/react`) — точечные анимации (hero, счётчики)
- **Nodemailer** — форма обращения, **next/og** — OG-картинки
- **Playwright** + **@axe-core/playwright** — e2e и проверка доступности
- **@lhci/cli** — Lighthouse CI
- Деплой: Docker (multi-stage, standalone) + Nginx + Let's Encrypt

## Быстрый старт

```bash
npm install
npm run dev
```

Откройте http://localhost:3000.

Если файла `.env` нет — скопируйте `.env.example` и заполните нужные значения (сайт
работает и без него: SMTP-письма просто пишутся в лог, `NEXT_PUBLIC_SITE_URL` по
умолчанию `http://localhost:3000`).

## Скрипты

| Команда | Что делает |
|---|---|
| `npm run dev` | локальный сервер разработки |
| `npm run build` | продакшен-сборка (валидирует весь `content/*.json` через Zod) |
| `npm run start` | запуск собранного приложения |
| `npm run typecheck` | проверка типов TypeScript |
| `npm run lint` | ESLint |
| `npm run format` | Prettier (автофикс) |
| `npm run test:e2e` | Playwright: e2e, доступность (axe), скриншоты |
| `npm run check` | typecheck + lint + test:e2e — полный прогон перед коммитом |
| `npm run lhci` | Lighthouse CI по ключевым страницам |
| `npm run icons` | перегенерировать фавикон/apple-icon (монограмма «Д») |

> **Для интерактивных проверок (меню, лайтбокс, форма) используйте `npm run build && npm run start`,
> а не `npm run dev`** — в некоторых песочницах HMR-вебсокет dev-сервера не поднимается и
> клиентский JS не гидрируется. Подробности — в `PROGRESS.md`.

## Структура проекта

```
content/            — факты о клубе (единственный источник правды, см. CLAUDE.md §2)
src/app/             — страницы (App Router), включая sitemap.ts, robots.ts, opengraph-image.tsx
src/components/      — компоненты дизайн-системы и разделов сайта
src/lib/             — загрузчик контента, Zod-схемы, SEO, форма, антиспам, шрифты
src/assets/fonts/    — локальный шрифт для OG-картинок (next/og)
e2e/                 — Playwright: функциональные тесты, a11y, SEO
docker/, Dockerfile, docker-compose.yml, deploy/ — деплой на VPS
docs/                — DEPLOY.md, CONTENT_GUIDE.md, LAUNCH_CHECKLIST.md, research-notes.md
```

## Документация

- [`PROGRESS.md`](./PROGRESS.md) — ход работы по фазам, принятые решения, известные ограничения
- [`docs/CONTENT_GUIDE.md`](./docs/CONTENT_GUIDE.md) — как менять текст, фото и легенд без программиста
- [`docs/DEPLOY.md`](./docs/DEPLOY.md) — пошаговый деплой на VPS (Docker + Nginx + Let's Encrypt)
- [`docs/LAUNCH_CHECKLIST.md`](./docs/LAUNCH_CHECKLIST.md) — что нужно от владельца перед публикацией
- [`docs/research-notes.md`](./docs/research-notes.md) — источники фактов и расхождения между ними
- [`.claude/settings.json`](./.claude/settings.json) — разрешения для автономной работы с Claude Code
