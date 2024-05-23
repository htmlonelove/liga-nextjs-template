import fs from 'fs'
import inquirer from 'inquirer'
import inquirerFileTreeSelection from 'inquirer-file-tree-selection-prompt'
import camelcase from 'camelcase'
import {indexTemplate, tsTemplate, tsxTemplate, scssTemplate} from './template.mjs'
import path from 'path'
import chalk from 'chalk'

inquirer.registerPrompt('file-tree-selection', inquirerFileTreeSelection)

const DIR_NAMES = ['views', 'modules', 'components', 'ui']

inquirer
  .prompt([
    {
      name: 'componentName',
      message: chalk.blueBright('Введите название компонента:')
    },
    {
      name: 'componentFolder',
      message: chalk.blueBright('Выберите директорию:'),
      type: 'file-tree-selection',
      root: './src',
      onlyShowDir: true,
      onlyShowValid: true,
      validate: (input) => {
        const dirName = input.split(path.sep).pop()
        return DIR_NAMES.includes(dirName)
      },
      transformer: (input) => {
        return input.split(path.sep).pop()
      }
    }
  ])
  .then((answers) => {
    const { componentName, componentFolder } = answers
    const isViews = componentFolder.split(path.sep).pop() === 'views'

    console.log(chalk.greenBright('📜 Используем шаблон компонента с названием: ' + chalk.whiteBright(camelcase(componentName))))

    const componentDirectory = `${componentFolder}/${camelcase(
      componentName
    )}`

    if (fs.existsSync(componentDirectory)) {
      console.error(chalk.red(`❌ Компонет ${chalk.whiteBright(camelcase(componentName))} уже существует`))
      process.exit(1)
    }

    if (!fs.existsSync(componentDirectory)) {
      fs.mkdirSync(componentDirectory, {
        recursive: true
      })
    }

    const generatedTemplates = [tsTemplate, scssTemplate, tsxTemplate, indexTemplate].map((template) => {
      const camelCaseName = camelcase(componentName)
      const isIndexTemplate = template.name === 'indexTemplate'
      const postfix = isViews ? 'view' : ''
      return isIndexTemplate ? template(camelCaseName, postfix) : template(camelCaseName)
    })

    generatedTemplates.forEach((template) => {
      fs.writeFileSync(
        `${componentDirectory}/${template.filename}`,
        template.content
      )
    })

    const dirName = `./src/${componentFolder.split(path.sep).pop()}`
    console.log(`✅  ${chalk.greenBright(`Создан компонент`)} ${chalk.whiteBright(camelcase(componentName))} ${chalk.greenBright('в директории')} ${chalk.whiteBright(dirName)}`)
  })
