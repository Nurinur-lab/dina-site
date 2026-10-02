# Запуск проекта в терминале (macOS)

## 1. Подготовка (один раз)

Проверьте Node.js — нужна версия 20 или новее:

    node -v

Если Node.js нет, установите LTS-версию с nodejs.org или через Homebrew: `brew install node`.

Установите Claude Code (нужна подписка Pro, Max, Team или Enterprise):

    curl -fsSL https://claude.ai/install.sh | bash
    claude --version

Если терминал пишет `command not found`, закройте и откройте его заново.

## 2. Распаковка проекта

    mkdir -p ~/Projects
    cd ~/Projects
    unzip ~/Downloads/dina-site.zip
    cd dina-site
    git config --global user.name >/dev/null || git config --global user.name "Ваше имя"
    git config --global user.email >/dev/null || git config --global user.email "you@example.ru"
    git init
    git add -A
    git commit -m "Стартовый комплект"

## 3. Запуск Claude Code

    claude

При первом запуске:
- войдите в аккаунт через браузер;
- на вопрос о доверии к папке ответьте **Yes** — без этого не применятся разрешения из `.claude/settings.json`.

Затем откройте файл `START_PROMPT.md`, скопируйте весь текст и вставьте в Claude Code. Нажмите Enter.

## 4. Как это работает дальше

- Разрешения в `.claude/settings.json` позволяют Claude самостоятельно править файлы, ставить npm-пакеты, запускать сборку, тесты и коммиты. Запрещены `sudo`, `git push`, SSH и чтение `.env`.
- Если Claude всё же спросит разрешение на непредусмотренную команду, выберите вариант «Yes, and don't ask again» — команда добавится в список.
- Работа идёт по фазам 0–7. Ход работы — в файле `PROGRESS.md`, его можно открыть в любой момент.
- Если сессия прервалась (закрыли терминал, кончился лимит), снова запустите `claude` в папке проекта и напишите: **«Продолжай по PROGRESS.md»**.
- Переключение режимов: Shift+Tab. Остановить текущее действие: Esc.

### Полностью без подтверждений (по желанию)

    claude --dangerously-skip-permissions

В этом режиме Claude не спрашивает разрешения вообще ни на что. Используйте только если папка проекта — отдельная и в ней нет ничего ценного кроме проекта. Обычного режима с `.claude/settings.json` достаточно.

## 5. Посмотреть результат

    npm run dev

Откройте http://localhost:3000.

## 6. Когда появятся данные

- Фото — в `public/photos/` с именами из `content/photos.json`.
- Название, контакты, реквизиты — в `content/club.json`.
- Почта для формы — скопируйте `.env.example` в `.env` и заполните.

После изменений: `npm run build` проверит, что всё корректно.
