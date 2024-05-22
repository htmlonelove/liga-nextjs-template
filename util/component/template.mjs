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

export const tsxTemplate = (componentName) => {
  const uppercaseName = camelcase(componentName, {pascalCase: true})
  const interfaceName = `${uppercaseName}Props`

  return ({
    content: `import { FC } from 'react'
import { ${interfaceName} } from './${componentName}.types'
import styles from './${componentName}.module.scss'
import classNames from 'classnames'

const ${uppercaseName}: FC<${interfaceName}> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)
  
  return (
    <div className={rootClassName}></div>
  )
}

export default ${uppercaseName}
`,
    filename: `${componentName}.tsx`
  })
}

export const indexTemplate = (componentName) => ({
  content: `export { default as ${camelcase(componentName, {pascalCase: true})} } from './${componentName}'`,
  filename: `index.ts`
})
