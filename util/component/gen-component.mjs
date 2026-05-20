import fs from 'fs'
import { input, select } from '@inquirer/prompts'
import camelcase from 'camelcase'
import { indexTemplate, tsTemplate, tsxTemplate, scssTemplate } from './template.mjs'
import { createIndex } from './gen-index.mjs'
import chalk from 'chalk'

const DIR_NAMES = ['views', 'modules', 'components', 'ui']

const componentName = await input({
  message: chalk.blueBright('Введите название компонента:')
})

const dirName = await select({
  message: chalk.blueBright('Выберите директорию:'),
  choices: DIR_NAMES
})

const componentFolder = `./src/${dirName}`
const camelCaseName = camelcase(componentName)
const isView = dirName === 'views'
const isModule = dirName === 'modules'

console.log(chalk.greenBright('📜 Используем шаблон компонента с названием: ' + chalk.whiteBright(camelCaseName)))

const componentDirectory = `${componentFolder}/${camelCaseName}`

if (fs.existsSync(componentDirectory)) {
  console.error(chalk.red(`❌ Компонет ${chalk.whiteBright(camelCaseName)} уже существует`))
  process.exit(1)
}

fs.mkdirSync(componentDirectory, {
  recursive: true
})

const generatedTemplates = [tsTemplate, scssTemplate, tsxTemplate, indexTemplate].map((template) => {
  if (isView) {
    switch (template.name) {
      case 'tsxTemplate':
        return template(camelCaseName, true)
      case 'indexTemplate':
        return template(camelCaseName, 'View')
    }
  }
  return template(camelCaseName)
})

generatedTemplates.forEach((template) => {
  fs.writeFileSync(
    `${componentDirectory}/${template.filename}`,
    template.content
  )
})

if (!isView && !isModule) {
  createIndex(componentFolder, componentName)
}

console.log(`✅  ${chalk.greenBright(`Создан компонент`)} ${chalk.whiteBright(camelCaseName)} ${chalk.greenBright('в директории')} ${chalk.whiteBright(componentFolder)}`)
