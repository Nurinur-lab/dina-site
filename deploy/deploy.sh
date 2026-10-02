#!/usr/bin/env bash
# Обновление сайта на VPS по SSH (CLAUDE.md, раздел 9).
#
# Запускается с локальной машины (или из CI). Параметры — из .env в корне
# проекта, ничего не хардкодится. Предполагается, что на сервере уже
# один раз вручную склонирован репозиторий — см. docs/DEPLOY.md, раздел
# «Первый запуск». Это скрипт для ОБНОВЛЕНИЙ, не для первого деплоя.
set -euo pipefail

cd "$(dirname "$0")/.."

if [ ! -f .env ]; then
  echo "Нет файла .env — скопируйте .env.example и заполните DEPLOY_HOST, DEPLOY_USER, DEPLOY_DOMAIN." >&2
  exit 1
fi

# shellcheck disable=SC1091
source .env

: "${DEPLOY_HOST:?Укажите DEPLOY_HOST в .env}"
: "${DEPLOY_USER:?Укажите DEPLOY_USER в .env}"
DEPLOY_PATH="${DEPLOY_PATH:-~/dina-site}"

echo "==> Подключаюсь к $DEPLOY_USER@$DEPLOY_HOST, папка $DEPLOY_PATH"

ssh "$DEPLOY_USER@$DEPLOY_HOST" bash -s <<EOF
set -euo pipefail
cd "$DEPLOY_PATH"

echo "==> git pull"
git pull --ff-only

echo "==> Сборка образа"
docker compose build app

echo "==> Перезапуск"
docker compose up -d --remove-orphans

echo "==> Старые неиспользуемые образы"
docker image prune -f

echo "Готово."
EOF
