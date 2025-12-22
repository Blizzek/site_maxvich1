# Деплой Next.js сайта на VPS (Reg.ru) с HTTPS, nginx и PM2

Ниже — единая проверенная инструкция от загрузки проекта на VPS до полностью рабочего HTTPS сайта с автопродлением SSL, автозапуском приложения и корректными редиректами.

## Предпосылки
- SSH доступ к VPS (root или sudo)
- Домен: `rem-maxvich-stroi-demo.ru`
- Открыты порты `80` и `443` (firewall/SEC-группы)

## 1. Настройка DNS в Reg.ru
- В зоне домена:
  - A (для `@`) → IPv4 вашего VPS, например `95.163.227.119`
  - CNAME (для `www`) → `rem-maxvich-stroi-demo.ru` (или A → тот же IPv4)
  - AAAA: удалить, если у VPS нет IPv6
  - TTL: 300 (временно, для ускорения)
- Проверка (через публичный резолвер):
```bash
# IPv4 должен указывать на ваш VPS, IPv6 (AAAA) — пусто
dig +short A rem-maxvich-stroi-demo.ru @8.8.8.8
dig +short A www.rem-maxvich-stroi-demo.ru @8.8.8.8
dig +short AAAA rem-maxvich-stroi-demo.ru @8.8.8.8
dig +short AAAA www.rem-maxvich-stroi-demo.ru @8.8.8.8
```

## 2. Загрузка проекта на VPS
Рекомендуемая директория проекта:
```bash
mkdir -p /var/www/site_maxvich1
cd /var/www/site_maxvich1
```
Загрузите сюда файлы (SFTP/FTP/ISPmanager/`scp`):
- `package.json`, `package-lock.json`
- `next.config.mjs`
- `public/`, `src/`, `data/`
- `.next/` (если собираете локально)
- `tsconfig.json`, `next-env.d.ts`

## 3. Node.js и зависимости
Установите Node.js ≥ 18 (рекоменд. 20/22) через nvm:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
. ~/.nvm/nvm.sh
nvm install 20
nvm use 20
node --version
npm --version
```
Установите зависимости (продакшн):
```bash
cd /var/www/site_maxvich1
npm install --production
```
Сборка (если `.next/` не загружали):
```bash
# при нехватке памяти можно: NODE_OPTIONS="--max-old-space-size=512" npm run build
npm run build
```

## 4. Запуск Next.js через PM2 (порт 3000)
```bash
npm install -g pm2
cd /var/www/site_maxvich1
pm2 start npm --name "rem-maxvich" -- start
pm2 save
pm2 startup  # выполните команду, которую выведет
pm2 list
pm2 logs rem-maxvich --lines 50
```
Проверка приложения:
```bash
curl http://localhost:3000
```

## 5. Установка и выпуск SSL (Let’s Encrypt)
```bash
apt update
apt install -y certbot python3-certbot-nginx
certbot --nginx -d rem-maxvich-stroi-demo.ru -d www.rem-maxvich-stroi-demo.ru
```
Файлы сертификата:
- `/etc/letsencrypt/live/rem-maxvich-stroi-demo.ru/fullchain.pem`
- `/etc/letsencrypt/live/rem-maxvich-stroi-demo.ru/privkey.pem`

## 6. Конфигурация nginx (reverse proxy)
Убедитесь, что в `/etc/nginx/nginx.conf` НЕТ блоков `server {}` — только `http { ... include /etc/nginx/sites-enabled/*; }`.

Создайте/обновите `/etc/nginx/sites-available/site_maxvich` и активируйте:
```bash
ln -sf /etc/nginx/sites-available/site_maxvich /etc/nginx/sites-enabled/site_maxvich
# удалите дефолт, если есть
test -L /etc/nginx/sites-enabled/default && rm /etc/nginx/sites-enabled/default
```
Содержимое `site_maxvich` (4 блока: 80/443 для apex и www):
```nginx
# HTTP -> HTTPS (канонично без www)
server {
    listen 80;
    server_name rem-maxvich-stroi-demo.ru;
    return 301 https://rem-maxvich-stroi-demo.ru$request_uri;
}

# HTTP www -> без www
server {
    listen 80;
    server_name www.rem-maxvich-stroi-demo.ru;
    return 301 https://rem-maxvich-stroi-demo.ru$request_uri;
}

# HTTPS канонический хост
server {
    listen 443 ssl http2;
    server_name rem-maxvich-stroi-demo.ru;

    ssl_certificate     /etc/letsencrypt/live/rem-maxvich-stroi-demo.ru/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/rem-maxvich-stroi-demo.ru/privkey.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    client_max_body_size 50M;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
        proxy_cache_bypass $http_upgrade;
    }
}

# HTTPS www -> без www
server {
    listen 443 ssl http2;
    server_name www.rem-maxvich-stroi-demo.ru;

    ssl_certificate     /etc/letsencrypt/live/rem-maxvich-stroi-demo.ru/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/rem-maxvich-stroi-demo.ru/privkey.pem;

    return 301 https://rem-maxvich-stroi-demo.ru$request_uri;
}
```
Проверка и перезапуск:
```bash
nginx -t
systemctl reload nginx
ss -tlpn | grep -E ':80|:443'
```

## 7. Финальная валидация
После обновления DNS (5–30 минут):
```bash
# редиректы
curl -I http://rem-maxvich-stroi-demo.ru
curl -I http://www.rem-maxvich-stroi-demo.ru
curl -I https://www.rem-maxvich-stroi-demo.ru

# контент по https
curl -I https://rem-maxvich-stroi-demo.ru
```
Проверка сертификата (SAN):
```bash
openssl s_client -connect rem-maxvich-stroi-demo.ru:443 -servername rem-maxvich-stroi-demo.ru -showcerts </dev/null 2>/dev/null \
| openssl x509 -noout -subject -issuer -dates -ext subjectAltName
```
Ожидаемо в SAN: `DNS:rem-maxvich-stroi-demo.ru, DNS:www.rem-maxvich-stroi-demo.ru`.

## 8. Автопродление SSL и автозапуск
Автопродление Let’s Encrypt:
```bash
systemctl enable certbot.timer
systemctl start certbot.timer
certbot renew --dry-run
```
Автозапуск PM2:
```bash
pm2 save
pm2 startup  # выполните команду, которую покажет
```

## 9. Траблшутинг
- Старый Node.js (ошибки синтаксиса): обновите Node ≥ 18 (через nvm).
- OOM при `next build`: `NODE_OPTIONS="--max-old-space-size=512" npm run build` или соберите локально и загрузите `.next/`.
- `EADDRINUSE: 3000`: остановите лишние процессы (`pm2 delete all`), запустите один.
- `server directive is not allowed here`: уберите `server {}` из `/etc/nginx/nginx.conf`, держите их только в `sites-available`.
- Чужой сертификат (*.hosting.reg.ru): исправьте DNS A/AAAA на IP вашего VPS; удалите AAAA, если нет IPv6.
- Redirect loop: держите один редирект 80→443 и корректный `proxy_pass`.
- Очистка локального DNS‑кэша:
  - Windows: `ipconfig /flushdns`
  - macOS: `sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder`
  - Linux: `sudo resolvectl flush-caches`

## 10. Быстрый чек‑лист
- [ ] A → IPv4 VPS, CNAME/`www` → apex, AAAA — удалены
- [ ] Приложение слушает 3000 (PM2 `rem-maxvich` online)
- [ ] Выдан LE сертификат на apex+www
- [ ] nginx активен, сайт в `sites-enabled`, нет `default`
- [ ] http→https редиректы, www→без www
- [ ] `curl -I https://rem-maxvich-stroi-demo.ru` → 200, SAN верный
- [ ] PM2 `save` + `startup`, certbot `timer` включен

Готово — сайт в продакшне с корректным HTTPS, редиректами и автоподдержкой.
