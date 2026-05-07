# CLAUDE.md

Инструкции для ИИ-ассистентов, работающих с этим шаблоном. Короткие правила, без воды.

## Стек

- Next.js 16 (App Router, сборка через `--webpack`), React 19, TypeScript (strict), SCSS + CSS Modules, Jotai.
- ESLint 9 + flat-config (`eslint.config.mjs`), `eslint-config-next/core-web-vitals`.
- Пакетный менеджер — **только yarn** (`preinstall` запрещает npm).
- Node ≥ 22 LTS (см. `.nvmrc`).

## Архитектура слоёв

Строго однонаправленные зависимости:

```
shared → ui → service → components → modules → views → app
```

- **`src/ui/`** — stateless-примитивы (Button, Input, Heading, Wrapper). Без бизнес-логики.
- **`src/components/`** — переиспользуемые компоненты с локальной логикой, не привязанные к странице (Dialog).
- **`src/modules/`** — крупные самодостаточные блоки со своим состоянием (Header, Footer).
- **`src/views/`** — композиция страницы, подключается из `app/*/page.tsx`.
- **`src/service/`** — провайдеры и системные утилиты (Provider, Portal).
- **`src/shared/`** — api, atoms, hooks, types, const, styles, assets.

Нижележащий слой **не импортирует** из вышележащего. Перед тем как положить файл в папку — сверяйся с этим списком.

### Выбор между `components/` и `modules/`

- Stateless визуальный «кирпич» → `ui/`.
- Переиспользуемый компонент с логикой, но без своего состояния всего блока → `components/`.
- Законченный блок со своими подкомпонентами и состоянием → `modules/`.

## Именование и структура папки компонента

Каждый компонент — это папка в camelCase с файлами:

```
dialog/
  dialog.tsx
  dialog.types.ts
  dialog.module.scss
  index.ts
```

Экспорт через `index.ts` именованным экспортом. Для `views/` экспорт `{ default as XxxView }`, для `modules/` — `{ default as Xxx }`.

**Не создавай компоненты вручную** — используй `yarn run gen:component`. Он принимает имя и директорию, создаёт все файлы по шаблону.

## Импорты

Используй алиасы из `tsconfig.json`, не относительные пути:

- `@/*` → `src/*`
- `@ui/*`, `@components/*`, `@modules/*`, `@views/*`, `@service/*`
- `@api/*`, `@atoms/*`, `@hooks/*`, `@styles/*`, `@types/*`, `@icons/*`
- `@public/*`

Порядок импортов задан `@ianvs/prettier-plugin-sort-imports` — при сохранении отсортируются автоматически.

## Компоненты

- По умолчанию всё — **Server Components**. `'use client'` ставь только когда нужны хуки состояния, refs или браузерные API.
- Пропсы типизируй в `<name>.types.ts`.
- Классы — через `classnames` и CSS Modules:
  ```typescript
  import styles from './foo.module.scss'
  import classNames from 'classnames'
  const cls = classNames(styles.root, className)
  ```

## Стили

- SCSS Modules для компонентов. Глобалы — в `src/shared/styles/`.
- Для размеров — функция `rem()`:
  ```scss
  @use '@styles/func' as *;
  .el { width: rem(100); }
  ```
- Stylelint требует имена классов в camelCase с опциональными `_модификаторами`: `^([a-z][a-zA-Z0-9]*)(_[a-z0-9]+)*$`.

## Состояние (Jotai)

- Атомы — в `src/shared/atoms/`, файл вида `xxxAtom.ts`.
- Разделяй read/write атомы (паттерн из `deviceAtom.ts`), чтобы компоненты не ребилдились без нужды.
- Для подписки — `useAtomValue`, для записи — `useSetAtom`.

## Иконки и картинки

- Raster → `next/image`.
- SVG из `src/shared/assets/icons/` импортируется как React-компонент: `import Icon from '@icons/icon.svg'`.
- Если нужен URL — `import url from '@icons/icon.svg?url'`.

## Скейлинг

Ширина шрифта html и тип устройства (`mobile | tablet | desktop`) устанавливаются хуком `useScaling` из `Provider`. Breakpoints лежат в `src/shared/const/`. Логика — в `src/shared/hooks/useScaling.ts` (см. JSDoc у `getScaleFontSize`).

## Маршруты

- `src/app/*/page.tsx` — тонкий файл с `metadata` и одним импортом из `@views/*`.
- Вся разметка страницы живёт во `views/`.

## Проверки перед сдачей работы

- `yarn run typecheck` — типы.
- `yarn run lint` — ESLint.
- `yarn run stylelint` — стили.
- `yarn run check` — всё вместе + prettier.

Pre-commit через husky + lint-staged автоматически прогонит eslint/stylelint/prettier на изменённых файлах.

## Чего не делать

- Не ставить npm-команды — только yarn.
- Не использовать относительные пути `../../` — только алиасы.
- Не класть бизнес-логику в `ui/`.
- Не импортировать из вышележащих слоёв (например, `shared` не видит `ui`).
- Не писать компоненты вручную, если применим `yarn run gen:component`.
- Не добавлять тесты и CI без явной просьбы — они не входят в шаблон.
- Не писать комментарии, объясняющие «что делает код». Комментарии только там, где неочевидно «почему».
