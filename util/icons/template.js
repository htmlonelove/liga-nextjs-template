module.exports = (componentName, fullName) => ({
  content: `import Icon from '../../assets/icons/${fullName}'

const ${componentName} = ({
  width = 24,
  height = 24,
  ...props
}: {
  width?: number;
  height?: number;
  [x: string]: any;
}) => {
  return (
    <Icon
      width={width}
      height={height}
      viewBox={'0 0 ' + width + ' ' + height}
      {...props}
    />
  )
};

export default ${componentName};

`,
  extension: `.tsx`
})
