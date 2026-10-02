#!/usr/bin/env bash
# Разовый скрипт первого выпуска сертификата Let's Encrypt (CLAUDE.md, раздел 9).
#
# Проблема курицы и яйца: nginx с конфигом из default.conf.template не
# запустится без сертификата по пути /etc/letsencrypt/live/$DOMAIN/, а
# certbot не может его выпустить без работающего на 80-м порту nginx. Решение:
# сначала кладём временный самоподписанный сертификат, поднимаем nginx,
# получаем настоящий сертификат через webroot-проверку, перезапускаем nginx.
#
# Запускать один раз на сервере, в папке проекта, после `docker compose build`.
# Повторный запуск безопасен (certbot не выпускает новый сертификат, если
# старый ещё долго действителен, см. флаг --keep-until-expiring в renew).
set -euo pipefail

cd "$(dirname "$0")/.."

if [ ! -f .env ]; then
  echo "Нет файла .env — скопируйте .env.example и заполните DEPLOY_DOMAIN, LETSENCRYPT_EMAIL." >&2
  exit 1
fi

# shellcheck disable=SC1091
source .env

: "${DEPLOY_DOMAIN:?Укажите DEPLOY_DOMAIN в .env}"
: "${LETSENCRYPT_EMAIL:?Укажите LETSENCRYPT_EMAIL в .env}"

echo "==> Создаю временный самоподписанный сертификат для $DEPLOY_DOMAIN"
docker compose run --rm --entrypoint sh certbot -c "
  mkdir -p /etc/letsencrypt/live/$DEPLOY_DOMAIN && \
  openssl req -x509 -nodes -newkey rsa:2048 -days 1 \
    -keyout /etc/letsencrypt/live/$DEPLOY_DOMAIN/privkey.pem \
    -out /etc/letsencrypt/live/$DEPLOY_DOMAIN/fullchain.pem \
    -subj '/CN=localhost'
"

echo "==> Запускаю nginx с временным сертификатом"
docker compose up -d nginx

echo "==> Удаляю временный сертификат и запрашиваю настоящий у Let's Encrypt"
docker compose run --rm --entrypoint sh certbot -c "rm -rf /etc/letsencrypt/live/$DEPLOY_DOMAIN /etc/letsencrypt/archive/$DEPLOY_DOMAIN /etc/letsencrypt/renewal/$DEPLOY_DOMAIN.conf"

docker compose run --rm certbot certonly \
  --webroot -w /var/www/certbot \
  --email "$LETSENCRYPT_EMAIL" \
  -d "$DEPLOY_DOMAIN" \
  --agree-tos --no-eff-email

echo "==> Перезапускаю nginx с настоящим сертификатом"
docker compose exec nginx nginx -s reload

echo "Готово: https://$DEPLOY_DOMAIN должен открываться с действительным сертификатом."
