import camelcase from 'camelcase'

export const scssTemplate = (componentName) => ({
  content: `@use "@styles/func";
@use "@styles/mixins";
@use "@styles/variables";
  
.root {}
`,
  filename: `${componentName}.module.scss`
})

export const tsTemplate = (componentName) => {
  const interfaceName = `${camelcase(componentName, {pascalCase: true})}Props`

  return ({
    content: `export interface ${interfaceName} {
  className?: string
}`,
    filename: `${componentName}.types.ts`
  })
}

export const tsxTemplate = (componentName, isView) => {
  const uppercaseName = camelcase(componentName, { pascalCase: true })
  const interfaceName = `${uppercaseName}Props`
  const component = isView ? '<main className={rootClassName}></main>' : '<div className={rootClassName}></div>'

  return ({
    content: `import { FC } from 'react'
import classNames from 'classnames'

import styles from './${componentName}.module.scss'
import { ${interfaceName} } from './${componentName}.types'

const ${uppercaseName}: FC<${interfaceName}> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)
  
  return (
    ${component}
  )
}

export default ${uppercaseName}
`,
    filename: `${componentName}.tsx`
  })
}

export const indexTemplate = (componentName, postfix = '') => {
  const name = componentName + postfix
  return ({
    content: `export { default as ${camelcase(name, {pascalCase: true})} } from './${componentName}'`,
    filename: `index.ts`
  })
}
