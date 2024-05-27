import { FC, InputHTMLAttributes } from 'react'
import classNames from 'classnames'

import styles from './input.module.scss'

const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  ...props
}) => {
  const rootClassName = classNames(styles.root, className)

  return <input {...props} className={rootClassName} />
}

export default Input
