import path from 'path'
import fs from 'fs'
import { glob } from 'glob'
import camelcase from 'camelcase'
import chalk from 'chalk'

export const createIndex = (folderName) => {
  console.log(`📁 ${chalk.whiteBright(`Генерируем диспетчер импортов`)}`)
  const componentsArray = []
  glob.sync(`${folderName}/**/`).forEach((componentPath) => {
    const dirname = path.dirname(componentPath)
    if (dirname !== 'src') {
      const basename = path.basename(componentPath)
      const componentName = camelcase(basename, {pascalCase: true})
      componentsArray.push({
        path: `./${basename}`,
        componentName
      })
    }
  })

  fs.writeFileSync(path.normalize(`${folderName}/index.ts`), '')
  componentsArray.reverse().forEach((item) => {
    fs.appendFileSync(
      path.normalize(`${folderName}/index.ts`),
      `export { ${item.componentName} } from '${item.path}'\r\n`
    )
  })
}



