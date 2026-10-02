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

### Фаза 1 — Дизайн-система: готово

- Шрифты: `src/lib/fonts.ts` — Fira Sans Extra Condensed (500/800) и Golos Text через `next/font/google`, самохостинг, кириллица+латиница. Golos Text подключён без фиксированного набора `weight` (см. решения ниже — это вариативный шрифт, конкретные веса 400/500 задаются через `font-weight` в CSS).
- `src/app/globals.css` — токены `--night/--night-2/--ivory/--mist/--pushkar/--field/--shield/--crown`, базовые стили заголовков (Fira Sans 800, прописные, плотный трекинг), видимый `:focus-visible`, `prefers-reduced-motion`.
- Компоненты: `Header` (компактный вордмарк + герб ≥40px, sticky, десктоп-навигация из `src/config/nav.ts`), `MobileMenu` (клиентский, полноэкранный `<dialog>`, фокус-ловушка и Esc — нативные), `Footer` (герб, полное название, слоган, навигация, контакты только если не `null`, диагональная полоса), `DiagonalStripe` (skewX(-18deg), 3 сегмента shield/pushkar/field), `GhostWord` (слово-«призрак» позади заголовка), `ArchivePhoto` (ищет файл в `public/photos/`, иначе типографический фолбэк: тёмная панель + `fallbackText` + тонкая 3-цветная полоса; архивные фото до 2010 — ч/б тонировка, 2012+ — приглушённая насыщенность), `Button` (primary/secondary/ghost).
- Иконки: `scripts/generate-icons.mjs` (sharp) — геометрическая монограмма «Д» из прямоугольников (без зависимости от системных шрифтов) → `src/app/icon.svg`, `src/app/apple-icon.png` (180×180), `public/favicon.svg`.
- `/styleguide` — служебная страница (цвета, типографика, кнопки, полоса, призрак, фолбэки `ArchivePhoto`), скрыта в production через `notFound()`.
- Скриншоты 360/768/1280 для `/` и `/styleguide` отсмотрены и поправлены: нашёл и исправил баг — `text-[18%]` в фолбэке `ArchivePhoto` интерпretировался как 18% от унаследованного font-size (а не от ширины контейнера), текст был почти нечитаем. Исправлено через CSS container queries (`containerType: inline-size` + `[font-size:20cqi]`) — теперь текст фолбэка крупный и всегда пропорционален контейнеру.
- Мобильное меню проверено вручную через Playwright-скрипт на продакшен-сборке, выглядит и работает корректно (скриншот `screenshots/mobile-menu-open-360.png`). Добавлены постоянные e2e-тесты `e2e/navigation.spec.ts` (открытие/закрытие меню, переход по десктопной навигации).
- `npm run check` — зелёный (9 тестов, 3 skipped по условию viewport).

## Решения, принятые без владельца

1. **`output: standalone` только по флагу `BUILD_STANDALONE`.** `next start` несовместим с `output: "standalone"` (пишет предупреждение и не поднимает сервер штатно) — нужен `node .next/standalone/server.js`. Чтобы не усложнять локальную разработку и `npm run test:e2e`/`lhci`, standalone включается только когда задана переменная окружения `BUILD_STANDALONE=1` — это выставит `Dockerfile` в фазе 7. Для обычной разработки и тестов используется обычный `next build`/`next start`.
2. **Ширины Playwright-проектов заданы вручную (360/768/1280)**, а не через готовые пресеты устройств (`devices[...]`), чтобы точно соответствовать разделу 10 CLAUDE.md, а не произвольным ширинам реальных телефонов/планшетов.
3. **`npm audit` показывает 14 уязвимостей (high) в транзитивных зависимостях `@lhci/cli`** (puppeteer-core → proxy-agent → basic-ftp/extract-zip/tmp и т. п.). Это dev-инструмент для локального запуска Lighthouse, в продакшен-сборку и на сервер не попадает. `npm audit fix --force` понижает `@lhci/cli` до `0.1.0` (breaking) — не делаю этого, фиксирую как известное ограничение дев-окружения.
4. **Golos Text подключён без явного списка `weight`.** При указании `weight: ["400","500"]` для этого шрифта Turbopack падает с ошибкой `next/font/google queries have exactly one entry` (Golos Text — вариативный шрифт с осью `wght`, и явный список статических весов конфликтует с резолвером шрифтов в Next 16.3.8/Turbopack). Решение: не передавать `weight` вовсе (используется вариативный диапазон), конкретную насыщенность задавать через CSS `font-weight: 400/500` там, где нужно.
5. **`agentRules: false` в `next.config.ts`.** По умолчанию `next dev` в Next.js 16 дописывает служебный блок "This is NOT the Next.js you know" прямо в `CLAUDE.md` при каждом запуске dev-сервера. `CLAUDE.md` — файл владельца с правилами проекта, он не должен автоматически меняться инструментом сборки. Отключил эту генерацию флагом в конфиге.
6. **Монограмма «Д» для фавикона собрана из прямоугольников (SVG-путь), а не через рендер текста системным шрифтом.** Так иконка выглядит одинаково в любой среде (macOS, Linux/Docker) независимо от того, какие шрифты установлены на машине, где собирается сайт.

## Известные особенности окружения разработки

- **В `next dev` (Turbopack) в этой песочнице не поднимается WebSocket для HMR** (`ERR_INVALID_HTTP_RESPONSE` при апгрейде). Из-за этого клиентская гидратация в dev-режиме не происходит вообще (React не подключается к серверному HTML, обработчики кликов не работают) — это артефакт среды, не баг кода. Проверено: на продакшен-сборке (`next build && next start`) гидратация и все интерактивные элементы (мобильное меню и т. д.) работают корректно. **Вывод на будущее**: любую проверку интерактивности (клики, меню, лайтбокс, форму) всегда делать через `next build && next start`, а не через `next dev`. Страницу `/styleguide` (которая в production скрыта через `notFound()`) можно смотреть только в dev — для неё визуальная (не интерактивная) проверка через dev-сервер достаточна, т.к. в стайлгайде нет интерактивных элементов, требующих гидратации.

## Что нужно от владельца

См. `docs/LAUNCH_CHECKLIST.md` — актуализируется по ходу работы.

## Известные ограничения

- `npm audit`: 14 high/moderate/low уязвимостей в транзитивных dev-зависимостях `@lhci/cli` (Lighthouse CI). Не влияет на продакшен-бандл сайта. Можно будет обновить при выходе новой мажорной версии `@lhci/cli`.
