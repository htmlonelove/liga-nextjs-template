import { FC } from 'react'
import classNames from 'classnames'

import styles from './header.module.scss'
import { HeaderProps } from './header.types'

const Header: FC<HeaderProps> = ({ className }) => {
  const headerClassName = classNames(styles.root, className)
  return <header className={headerClassName}>Header</header>
}

export default Header
