# Технологический стек для Rem-Maxvich-Stroi

## 🎯 Рекомендуемые технологии

### Frontend

#### Framework: **Next.js 14+** (App Router)
```bash
npx create-next-app@latest rem-maxvich-stroi --typescript --tailwind --app
```

**Почему Next.js?**
- ✅ Server-Side Rendering (SSR) для отличного SEO
- ✅ Статическая генерация (SSG) для быстрой загрузки
- ✅ Оптимизация изображений из коробки (next/image)
- ✅ API Routes для серверной логики
- ✅ File-based routing
- ✅ Отличная документация и поддержка

**Альтернативы:**
- Astro (для максимальной производительности, но меньше интерактива)
- Nuxt.js (если предпочитаете Vue)

---

### Стилизация

#### **Tailwind CSS + shadcn/ui**

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npx shadcn-ui@latest init
```

**Почему Tailwind CSS?**
- ✅ Быстрая разработка с utility-классами
- ✅ Адаптивный дизайн из коробки
- ✅ Малый размер финального CSS (tree-shaking)
- ✅ Легкая кастомизация темы

**Почему shadcn/ui?**
- ✅ Готовые, качественные компоненты
- ✅ Копируются в проект (полный контроль)
- ✅ Доступность (a11y) из коробки
- ✅ Легко кастомизировать

**Альтернативы:**
- MUI (Material-UI) - если нужен готовый Material Design
- Chakra UI - если нужны готовые компоненты с темизацией

---

### Анимации

#### **Framer Motion**

```bash
npm install framer-motion
```

**Возможности:**
- ✅ Плавные анимации при скролле
- ✅ Переходы между страницами
- ✅ Анимированные модальные окна
- ✅ Gesture-based анимации

**Альтернативы:**
- GSAP (более мощный, но сложнее)
- React Spring (физика-based анимации)

---

### Слайдеры и карусели

#### **Swiper.js**

```bash
npm install swiper
```

**Использование:**
- Портфолио (галерея работ)
- Отзывы клиентов
- Фото "до/после"

**Альтернативы:**
- Embla Carousel (легковесный)
- Keen Slider (производительный)

---

### Формы и валидация

#### **React Hook Form + Zod**

```bash
npm install react-hook-form zod @hookform/resolvers
```

**Почему React Hook Form?**
- ✅ Минимум ре-рендеров
- ✅ Простой API
- ✅ Отличная производительность
- ✅ TypeScript поддержка

**Почему Zod?**
- ✅ TypeScript-first валидация
- ✅ Инференция типов
- ✅ Читаемые схемы валидации

**Пример:**
```typescript
const schema = z.object({
  name: z.string().min(2, "Минимум 2 символа"),
  phone: z.string().regex(/^\+?[0-9]{10,}$/, "Неверный формат"),
  email: z.string().email("Неверный email"),
});
```

---

### Иконки

#### **Lucide React** (рекомендуется для shadcn/ui)

```bash
npm install lucide-react
```

**Альтернативы:**
- React Icons (большая коллекция)
- Heroicons (от Tailwind Labs)

---

## 🗄 Backend & CMS

### Вариант 1: Headless CMS (Рекомендуется)

#### **Strapi** или **Payload CMS**

```bash
# Strapi
npx create-strapi-app@latest backend --quickstart

# Payload CMS
npx create-payload-app@latest
```

**Преимущества:**
- ✅ Админ-панель для клиента
- ✅ REST/GraphQL API из коробки
- ✅ Управление медиа (фото, видео)
- ✅ Роли и права доступа
- ✅ Легко добавлять портфолио, отзывы, услуги

**Когда использовать:**
- Клиент хочет сам обновлять контент
- Нужна база данных для заявок
- Планируется активное обновление портфолио

---

### Вариант 2: Без CMS (Статический контент)

**Контент хранится в:**
- JSON файлы (`/src/data/*.json`)
- Markdown файлы (`/content/*.md`)

**Преимущества:**
- ✅ Проще в разработке
- ✅ Быстрее работает
- ✅ Дешевле хостинг

**Недостатки:**
- ⚠️ Обновления через разработчика
- ⚠️ Нет админ-панели

---

### Вариант 3: Git-based CMS

#### **Decap CMS** (ранее Netlify CMS)

```bash
npm install decap-cms-app
```

**Преимущества:**
- ✅ UI для редактирования
- ✅ Хранение в Git
- ✅ Бесплатный
- ✅ Не требует сервера

---

## 🔗 Интеграции

### Telegram Bot для заявок

```bash
npm install node-telegram-bot-api
```

**Реализация:**
```typescript
// app/api/submit-form/route.ts
import axios from 'axios';

export async function POST(req: Request) {
  const data = await req.json();
  
  const message = `
🆕 Новая заявка с сайта!
👤 Имя: ${data.name}
📞 Телефон: ${data.phone}
📧 Email: ${data.email}
💬 Сообщение: ${data.message}
  `;
  
  await axios.post(
    `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text: message,
    }
  );
  
  return Response.json({ success: true });
}
```

---

### Email уведомления

#### **Nodemailer** или **Resend**

```bash
# Nodemailer (для SMTP)
npm install nodemailer

# Resend (современный, простой)
npm install resend
```

**Пример с Resend:**
```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'noreply@rem-maxvich.ru',
  to: 'info@rem-maxvich.ru',
  subject: 'Новая заявка',
  html: emailTemplate,
});
```

---

### Карты

#### **Yandex Maps API**

```bash
npm install @pbe/react-yandex-maps
```

**Использование:**
```tsx
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

<YMaps>
  <Map defaultState={{ center: [56.326887, 44.005986], zoom: 15 }}>
    <Placemark geometry={[56.326887, 44.005986]} />
  </Map>
</YMaps>
```

---

### reCAPTCHA (защита от спама)

```bash
npm install react-google-recaptcha
```

**Альтернатива:** Honeypot (скрытое поле) - проще и без Google

---

## 📊 Аналитика

### Yandex Metrika

```bash
npm install react-yandex-metrika
```

### Google Analytics

```bash
npm install @next/third-parties
```

---

## 🚀 Хостинг и Деплой

### **Vercel** (Рекомендуется)

**Преимущества:**
- ✅ Бесплатный план для Next.js
- ✅ Автоматический деплой из Git
- ✅ CDN по всему миру
- ✅ SSL сертификат
- ✅ Serverless Functions
- ✅ Оптимизация изображений

**Альтернативы:**
- **Netlify** - похож на Vercel
- **Cloudflare Pages** - быстрый CDN
- **Railway** - если нужен backend

---

### База данных (если нужна)

**Для Strapi/Payload:**
- **PostgreSQL** на Railway/Supabase
- **MongoDB** на MongoDB Atlas

---

## 🛠 Инструменты разработки

### Package Manager: **pnpm** или **npm**

```bash
npm install -g pnpm
```

**Почему pnpm?**
- ✅ Быстрее npm/yarn
- ✅ Экономит место на диске
- ✅ Строгая структура зависимостей

---

### TypeScript

```bash
# Уже включен при создании Next.js проекта
```

**Преимущества:**
- ✅ Автодополнение
- ✅ Меньше багов
- ✅ Лучшая поддержка IDE

---

### Линтеры и форматтеры

#### **ESLint** (уже в Next.js)
```bash
npm run lint
```

#### **Prettier**
```bash
npm install -D prettier eslint-config-prettier
```

---

### Git и контроль версий

```bash
git init
git add .
git commit -m "Initial commit"
```

**Рекомендуемая структура коммитов:**
- `feat: добавлена главная страница`
- `fix: исправлена форма заявки`
- `style: обновлены стили кнопок`

---

## 📦 Зависимости проекта

### Основные зависимости (package.json)

```json
{
  "dependencies": {
    "next": "^14.1.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "tailwindcss": "^3.4.1",
    "framer-motion": "^11.0.3",
    "swiper": "^11.0.5",
    "react-hook-form": "^7.49.3",
    "zod": "^3.22.4",
    "@hookform/resolvers": "^3.3.4",
    "lucide-react": "^0.312.0",
    "@pbe/react-yandex-maps": "^1.2.5",
    "axios": "^1.6.5"
  },
  "devDependencies": {
    "typescript": "^5.3.3",
    "@types/node": "^20.11.5",
    "@types/react": "^18.2.48",
    "eslint": "^8.56.0",
    "prettier": "^3.2.4",
    "autoprefixer": "^10.4.17",
    "postcss": "^8.4.33"
  }
}
```

---

## 🏗 Пример команды для создания проекта

```bash
# 1. Создать Next.js проект
npx create-next-app@latest rem-maxvich-stroi --typescript --tailwind --app --src-dir

# 2. Перейти в папку
cd rem-maxvich-stroi

# 3. Установить shadcn/ui
npx shadcn-ui@latest init

# 4. Установить дополнительные зависимости
npm install framer-motion swiper react-hook-form zod @hookform/resolvers lucide-react @pbe/react-yandex-maps axios

# 5. Установить dev зависимости
npm install -D prettier eslint-config-prettier

# 6. Запустить dev сервер
npm run dev
```

---

## 🎨 Структура проекта с технологиями

```
rem-maxvich-stroi/
├── public/                          # Статические файлы
│   ├── images/
│   ├── videos/
│   └── favicon/
├── src/
│   ├── app/                         # Next.js App Router
│   │   ├── layout.tsx              # Root layout
│   │   ├── page.tsx                # Главная страница
│   │   ├── about/page.tsx
│   │   ├── services/page.tsx
│   │   ├── portfolio/page.tsx
│   │   ├── calculator/page.tsx
│   │   └── api/                    # API Routes
│   │       ├── submit-form/route.ts
│   │       └── calculate/route.ts
│   ├── components/
│   │   ├── ui/                     # shadcn компоненты
│   │   ├── layout/
│   │   ├── sections/
│   │   ├── forms/
│   │   └── shared/
│   ├── lib/
│   │   ├── utils.ts                # cn() helper и др.
│   │   ├── constants.ts
│   │   └── validation.ts           # Zod схемы
│   ├── data/                       # JSON данные (если без CMS)
│   │   ├── services.json
│   │   ├── portfolio.json
│   │   └── reviews.json
│   └── styles/
│       └── globals.css             # Tailwind директивы
├── .env.local                       # Переменные окружения
├── next.config.js                   # Конфигурация Next.js
├── tailwind.config.ts              # Конфигурация Tailwind
├── tsconfig.json                   # TypeScript конфиг
├── package.json
└── README.md
```

---

## 🔐 Переменные окружения (.env.local)

```env
# Telegram Bot
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id

# Email (Resend)
RESEND_API_KEY=your_resend_api_key

# Yandex Maps
NEXT_PUBLIC_YANDEX_MAPS_API_KEY=your_maps_key

# Analytics
NEXT_PUBLIC_YM_ID=your_metrika_id
NEXT_PUBLIC_GA_ID=your_google_analytics_id

# reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key
RECAPTCHA_SECRET_KEY=your_secret_key
```

---

## 🎯 Итоговый стек (рекомендация)

### Для MVP (минимальная версия):
```
Next.js 14 + TypeScript
Tailwind CSS + shadcn/ui
Framer Motion (анимации)
Swiper (слайдеры)
React Hook Form + Zod
JSON файлы (контент)
Telegram Bot (заявки)
Vercel (хостинг)
```

### Для полной версии:
```
Next.js 14 + TypeScript
Tailwind CSS + shadcn/ui
Framer Motion
Swiper
React Hook Form + Zod
Payload CMS (админка)
PostgreSQL (база данных)
Telegram Bot + Resend (уведомления)
Yandex Maps
Vercel + Railway (хостинг)
```

---

## 💡 Рекомендация

Начать с **MVP версии** (без CMS), чтобы:
1. Быстрее запустить сайт
2. Собрать обратную связь
3. Понять, нужна ли админка

Затем при необходимости добавить **Payload CMS** для самостоятельного управления контентом.

---

**Следующий шаг:** Выбрать подход (с CMS или без) и начать разработку!
