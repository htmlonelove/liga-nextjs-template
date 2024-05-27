import fs from 'fs'
import inquirer from 'inquirer'
import inquirerFileTreeSelection from 'inquirer-file-tree-selection-prompt'
import camelcase from 'camelcase'
import {indexTemplate, tsTemplate, tsxTemplate, scssTemplate} from './template.mjs'
import {createIndex} from './gen-index.mjs'
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
    const dirName = componentFolder.split(path.sep).pop()
    const camelCaseName = camelcase(componentName)
    const isView = dirName === 'views'
    const isModule = dirName === 'modules'

    console.log(chalk.greenBright('📜 Используем шаблон компонента с названием: ' + chalk.whiteBright(camelCaseName)))

    const componentDirectory = `${componentFolder}/${camelCaseName}`

    if (fs.existsSync(componentDirectory)) {
      console.error(chalk.red(`❌ Компонет ${chalk.whiteBright(camelCaseName)} уже существует`))
      process.exit(1)
    }

    if (!fs.existsSync(componentDirectory)) {
      fs.mkdirSync(componentDirectory, {
        recursive: true
      })
    }

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

    const dirPath = `./src/${dirName}`
    console.log(`✅  ${chalk.greenBright(`Создан компонент`)} ${chalk.whiteBright(camelcase(componentName))} ${chalk.greenBright('в директории')} ${chalk.whiteBright(dirPath)}`)
  })
