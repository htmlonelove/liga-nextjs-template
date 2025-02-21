[![Liga A](./public/images/banner.jpg)](https://ligaa.agency/)

# Гайд по работе

Для начала работы необходимы:

- **[Node.js](https://nodejs.org/en/download/prebuilt-installer)** 20 версии
- Пакетный менеджер **[yarn](https://classic.yarnpkg.com/lang/en/docs/install/)** `npm install --global yarn`

## 🐱‍💻 Команды

| Command                  | Action                                        |
| :----------------------- | :-------------------------------------------- |
| `yarn install`           | Установить зависимости                        |
| `yarn run dev`           | Запустить локальный дев сервер                |
| `yarn run build`         | Создать оптимизированный production build     |
| `yarn run start`         | Запустить production build                    |
| `yarn run lint`          | Запустить линтер                              |
| `yarn run stylelint`     | Запустить линтер стилей                       |
| `yarn run prettier`      | Фрорматировать код с настройками prettier     |
| `yarn run check`         | Запустить проверку линтерами и форматирование |
| `yarn run gen:component` | Утилита для создания шаблонного компонента    |

## 🚀 Структура

Используется модульная архитектура

Нижележащий слой может испльзоваться только в слоях стоящих выше по иерархии

### `shared 🡒 ui 🡒 service 🡒 components 🡒 modules 🡒 views 🡒 app`

**Для генерации компонентов используйте утилиту `yarn run gen:component`**

```text
├── public/                 # статические файлы (иконки, картинки и тп.)
│   ├── icons/
│   ├── images/
│   ├── ...
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── app/                # next app router
│   │   ├── fonts/          # шрифты для локального подключения next/font
│   │   ├── ...
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/         # компоненты ( могут обладать бизнес-логикой )
│   │   ├── dialog/
│   │   ├── ...
│   │   └── index.ts
│   ├── modules/            # модули ( могут иметь вложенные компоненты, своё состояние и изолированную логику )
│   │   ├── footer/
│   │   ├── header/
│   │   └── ...
│   ├── service/            # сервисные компоненты ( провайдеры, порталы и подобные им сущности )
│   │   ├── portal/
│   │   ├── provider/
│   │   └── ...
│   ├── shared/             # общее ( переиспользуемые глобальные сущности не имеющие конкретной привязки )
│   │   ├── api/
│   │   ├── assets/
│   │   ├── atoms/
│   │   ├── const/
│   │   ├── hooks/
│   │   ├── styles/
│   │   └── types/
│   ├── ui/                 # элементы интерфейса ( базовые переиспользуемые ui компоненты )
│   │   ├── button/
│   │   ├── ...
│   │   └── index.ts
│   └── views/              # страницы ( лэйауты страниц )
│       ├── home/
│       └── ...
├── util/                   # утилиты ( автоматизация процессов, генерация компонентов, оптимизация картинок и тп. )
│   ├── component/
│   └── ...
├── package.json
└── ...
```

## 🔄 Стейт менеджмент

В качестве стейт менеджера по умолчанию используется **[Jotai](https://jotai.org/)**

## 🎴 Картинки

Для оптимизации изображений используйте компонент **[next/image](https://nextjs.org/docs/app/building-your-application/optimizing/images)**

## ♠️ Иконки

SVG графика для импорта в качестве компонента хранится в директории `src/shared/assets/icons`

Импортируется как компонент:

```typescript jsx
import Icon from '@icons/icon.svg'

const IconExample = () => (
  <div>
    <Icon />
  </div>
)
```

## 📏 Адаптив и скейлинг

По умолчанию в сборке используется скейлинг - хук `useScaling` (вызов из `src/service/provider`). В этом же хуке устанавливается значение для кастомной переменной `--vh` и происходит определение типа устройства, в зависимости от ширины вьюпорта (`mobile`, `tablet`, `desktop`).

В качестве параметров `useScaling` принимает `deviceBreakpoints` (брейкпоинты для определения типа устройства) и `scalingBreakpoints` (брейкпоинты для скейлинга).

Каждый брейкпоинт в `scalingBreakpoints` должен определять ширину экрана `size`, на которой будет произведён переход на него (с опциональным значением `min` для скейлинга вниз от брейкпоинта) и параметры `fontSize` для размера шрифта, устанавливаемого на тег `html` (обязательный базовый размер `base` и опциональные `min` и `max` для предотвращения чрезмерного уменьшения/увеличения размеров).

При задании размеров в стилях необходимо использовать функцию `rem()`, которая импортируется из `'styles/func'`:

```scss
@use '@styles/func';

.element {
  width: func.rem(100);
}
```

## Github Actions

### Создание образа Docker

Экшен запустится после того, как в интерфейсе репозитория будет создан релиз. 

Вы увидите, что в репозитории появится пакет с названием репозитория.

### Деплой на VPS

Деплой нужно запускать вручную через Github Actions. Он стягивает последнюю версию пакета с тегом Latest. Поэтому стоит дождаться создания образа. Перед этим проверьте, что VPS готов к деплою и все секреты указаны для репозитория.

## Как подготовить всё к деплою на VPS

### Подготовка VPS

После того как вы выбрали конфигурацию VPS, запустили сервер на Ubuntu, подключились к нему по SSH или использовали внутренний терминал (SSH удобнее).

В командной строке выполните следующий скрипт:

```
bash -c 'GREEN="\033[0;32m"; RED="\033[0;31m"; YELLOW="\033[0;33m"; NC="\033[0m"; echo -e "${YELLOW}Updating and upgrading packages...${NC}"; sudo apt update && sudo apt upgrade -y; echo -e "${YELLOW}Installing Docker, Docker Compose, and Nginx...${NC}"; sudo apt install -y docker.io docker-compose-v2 nginx; echo -e "${YELLOW}Enabling and starting Docker and Nginx...${NC}"; sudo systemctl enable --now docker && sudo systemctl enable --now nginx; echo -e "${YELLOW}Adding user to Docker group...${NC}"; sudo usermod -aG docker $USER; echo -e "${YELLOW}Please log out and log back in to apply Docker group changes.${NC}"; sudo -u $USER docker run hello-world && echo -e "${GREEN}Script executed successfully!${NC}"'

```

Этот скрипт обновит все пакеты, установит Docker, Docker Compose и Nginx, а также проверит, что Docker запускается.

После того как вы увидите сообщение “Script executed successfully!”, переходим к следующему шагу.

### Добавление SSH-ключа

Создайте SSH-ключ на своей локальной машине. Ключу должен быть без пароля. Для удобства можете назвать его `deploy`. Скопируйте свой **ПУБЛИЧНЫЙ** ключ и выполните в терминале VPS следующую команду:

```
echo "ВАШ_СКОПИРОВАННЫЙ_КЛЮЧ" >> ~/.ssh/authorized_keys
```

### Настройка секретов в GitHub

В настройках репозитория перейдите в раздел **Secrets and variables > Actions**. Добавьте следующие секреты:

```jsx
SSH_PRIVATE_KEY=`ПРИВАТНЫЙ ключ. 
Должен содержать -----BEGIN OPENSSH PRIVATE KEY-----
и -----END OPENSSH PRIVATE KEY-----`

VPS_IP=`IP вашего VPS сервера`
VPS_USERNAME=`имя пользователя VPS. Скорее всего это: root`
```

### Настроки Ngnix

В корне репозитория находится файл `nginx.conf` . Сейчас в нем активен простой конфиг для HTTP. В закоментированно виде более сложный конгфиг для HTTPS. Данный конфиг лишь шаблон, который не полностью был протестирован. Особенно не подключался SSL-сертификат. 

НО самое главное -  `не забудьте заменить все your_domain_or_ip на актуальный домен или IP сервера`
