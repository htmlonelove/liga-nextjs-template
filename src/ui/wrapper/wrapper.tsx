import { FC } from 'react'
import classNames from 'classnames'

import styles from './wrapper.module.scss'
import { WrapperProps } from './wrapper.types'

const Wrapper: FC<WrapperProps> = ({ children, className }) => {
  const rootClassName = classNames(styles.root, className)

  return <div className={rootClassName}>{children}</div>
}

export default Wrapper
