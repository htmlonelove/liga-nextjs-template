[![Liga A](./public/icons/logo.svg)](https://ligaa.agency/)

![Tech stack](https://skillicons.dev/icons?i=react,next,ts,sass)

# Гайд по работе

Для начала работы необходимы:
- [Node.js](https://nodejs.org/en/download/prebuilt-installer) 20 версии
- Пакетный менеджер [yarn](https://classic.yarnpkg.com/lang/en/docs/install/) `npm install --global yarn`

## 🐱‍💻 Команды

| Command                  | Action                                          |
|:-------------------------|:------------------------------------------------|
| `yarn install`           | Установить зависимости                          |
| `yarn run dev`           | Запустить локальный дев сервер `localhost:3000` |
| `yarn run build`         | Создать оптимизированный production build       |
| `yarn run start`         | Запустить production build                      |
| `yarn run lint`          | Запустить линтер                                |
| `yarn run stylelint`     | Запустить линтер стилей                         |
| `yarn run prettier`      | Фрорматировать код с настройками prettier       |
| `yarn run check`         | Запустить проверку линтерами и форматирование   |
| `yarn run gen:component` | Утилита для создания шаблонного компонента      |

## 🚀 Структура

```text
├── public/
│   ├── icons/
│   ├── images/
│   ├── ...
│   └── robots.txt
├── src/
│   ├── app/
│   │   ├── fonts/
│   │   ├── ...
│   │   ├── favicon.ico
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── dialog/
│   │   ├── ...
│   │   └── index.ts
│   ├── modules/
│   │   ├── footer/
│   │   ├── header/
│   │   └── ...
│   ├── service/
│   │   ├── portal/
│   │   ├── provider/
│   │   └── ...
│   ├── shared/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── atoms/
│   │   ├── const/
│   │   ├── hooks/
│   │   ├── styles/
│   │   └── types/
│   ├── ui/
│   │   ├── button/
│   │   ├── ...
│   │   └── index.ts
│   └── views/
│       ├── home/
│       └── ...
├── util/
│   ├── component/
│   └── ...
├── package.json
└── ...
```

## 🎴 Картинки

Для оптимизации изображений используется компонент [next/image](https://nextjs.org/docs/app/building-your-application/optimizing/images)

## ♠️ Иконки

SVG графика хранится в директории `src/shared/assets/icons`

Импортируется как компонент:

```React
import Icon from '@icons/icon.svg'

const IconExample = () => (
  <div>
    <Icon />
  </div>
)
```
