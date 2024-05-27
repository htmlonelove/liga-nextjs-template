import { FC } from 'react'
import { Wrapper } from '@/ui'
import classNames from 'classnames'

import { version } from '../../../package.json'
import styles from './header.module.scss'
import { HeaderProps } from './header.types'
import Logo from './logo'

const Header: FC<HeaderProps> = ({ className }) => {
  const headerClassName = classNames(styles.root, className)
  return (
    <header className={headerClassName}>
      <Wrapper className={styles.wrapper}>
        <Logo />
        <strong>v {version}</strong>
      </Wrapper>
    </header>
  )
}

export default Header
