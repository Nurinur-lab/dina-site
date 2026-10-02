# PROGRESS — сайт ИФК «Дина»

Работа ведётся автономно согласно `CLAUDE.md`. Этот файл — единственный источник правды о ходе работы между сессиями.

## План по фазам

0. **Каркас** — Next.js (App Router) + TS strict + Tailwind v4 + ESLint/Prettier + Zod-схемы/загрузчик контента + Playwright + LHCI + npm-скрипты. Критерий: `npm run build` проходит, контент валидируется.
1. **Дизайн-система** — токены, шрифты (Fira Sans Extra Condensed + Golos Text самохостинг), шапка, мобильное меню, футер, диагональная полоса, слово-«призрак», `ArchivePhoto` с типографическим фолбэком, кнопки, `/styleguide` (dev-only). Критерий: скриншоты `/styleguide` 360/768/1280 выглядят цельно.
2. **Главная** — 8 блоков по разделу 4 CLAUDE.md. Критерий: скриншоты трёх ширин просмотрены и поправлены.
3. **Внутренние страницы** — `/istoriya`, `/lyudi`, `/foto` (лайтбокс), `/klub`, `/politika`, 404.
4. **Форма обращения** — Server Action, Zod, антиспам (honeypot, тайминг, rate-limit), согласие на ПДн, Nodemailer/лог-фоллбек, e2e на успех/ошибки.
5. **SEO** — метаданные, OG через next/og, sitemap.xml, robots.txt, schema.org (SportsOrganization, Person), хлебные крошки, cookie-баннер + Метрика по условию.
6. **Качество** — axe (0 serious/critical), Lighthouse mobile (Perf≥90, A11y≥95, BP≥95, SEO=100), Core Web Vitals, финальный проход по скриншотам.
7. **Деплой и документация** — Dockerfile, docker-compose.yml (app+nginx+certbot), deploy/deploy.sh, docs/DEPLOY.md, docs/CONTENT_GUIDE.md, обновлённый README.md, актуализация docs/LAUNCH_CHECKLIST.md.

Окружение: Node v24.15.0, npm 11.12.1. Git уже инициализирован первым коммитом «Стартовый комплект» (сделан до начала этой сессии). Logo: `public/brand/logo-full.png`, 1024×1536 — подтверждён.

## Статус

Начало работы: 2026-10-02.

### Фаза 0 — Каркас: готово

- Next.js 16.3.8 (App Router, Turbopack), React 19, TypeScript strict, Tailwind v4 — установлены в корень проекта (временная папка `scaffold-tmp` удалена после переноса).
- `src/lib/schemas.ts` — Zod-схемы для всех `content/*.json` (null = «не подтверждено», ничем не заменяется).
- `src/lib/content.ts` — загрузчик: импортирует JSON напрямую (попадает в сборку одинаково в dev/build/standalone), валидирует схемой, при ошибке — понятное сообщение на русском с остановкой сборки. Экспортирует типизированные `club`, `people`, `photos`, `sources`, `timeline`, `trophies`, хелперы `getPhotoSlot`, `getSourceUrl`, `featuredLegends`, `featuredTrophies`.
- `src/config/nav.ts` — единый конфиг навигации (`mainNav`, `footerNav`) под будущие V2-разделы.
- `next.config.ts` — `output: "standalone"` включается только при `BUILD_STANDALONE=1` (см. решения ниже).
- Playwright настроен с тремя проектами ровно под требуемые ширины 360/768/1280 (`playwright.config.ts`), LHCI — `lighthouserc.js` (mobile-профиль, пороги по разделу 10), Prettier + prettier-plugin-tailwindcss, ESLint (eslint-config-next).
- Скрипты `dev/build/start/typecheck/lint/test:e2e/check/lhci/format/icons` в `package.json`.
- Базовые `layout.tsx` (lang="ru", CSS-токены дизайн-системы в `globals.css`), временная `page.tsx` — заглушка, подтверждающая, что контент загружается.
- `npm run build`, `npm run check` (typecheck+lint+e2e) — зелёные.

## Решения, принятые без владельца

1. **`output: standalone` только по флагу `BUILD_STANDALONE`.** `next start` несовместим с `output: "standalone"` (пишет предупреждение и не поднимает сервер штатно) — нужен `node .next/standalone/server.js`. Чтобы не усложнять локальную разработку и `npm run test:e2e`/`lhci`, standalone включается только когда задана переменная окружения `BUILD_STANDALONE=1` — это выставит `Dockerfile` в фазе 7. Для обычной разработки и тестов используется обычный `next build`/`next start`.
2. **Ширины Playwright-проектов заданы вручную (360/768/1280)**, а не через готовые пресеты устройств (`devices[...]`), чтобы точно соответствовать разделу 10 CLAUDE.md, а не произвольным ширинам реальных телефонов/планшетов.
3. **`npm audit` показывает 14 уязвимостей (high) в транзитивных зависимостях `@lhci/cli`** (puppeteer-core → proxy-agent → basic-ftp/extract-zip/tmp и т. п.). Это dev-инструмент для локального запуска Lighthouse, в продакшен-сборку и на сервер не попадает. `npm audit fix --force` понижает `@lhci/cli` до `0.1.0` (breaking) — не делаю этого, фиксирую как известное ограничение дев-окружения.

## Что нужно от владельца

См. `docs/LAUNCH_CHECKLIST.md` — актуализируется по ходу работы.

## Известные ограничения

- `npm audit`: 14 high/moderate/low уязвимостей в транзитивных dev-зависимостях `@lhci/cli` (Lighthouse CI). Не влияет на продакшен-бандл сайта. Можно будет обновить при выходе новой мажорной версии `@lhci/cli`.
