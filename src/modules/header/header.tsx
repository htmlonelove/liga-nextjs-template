import { FC } from 'react'
import { HeaderProps } from './header.types'
import styles from './header.module.scss'
import classNames from 'classnames'

const Header: FC<HeaderProps> = ({ className }) => {
  const headerClassName = classNames(styles.root, className)
  return <header className={headerClassName}>Header</header>
}

export default Header
