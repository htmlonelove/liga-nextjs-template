import { FC } from 'react'
import { DialogProps } from './dialog.types'
import styles from './dialog.module.scss'
import classNames from 'classnames'

const Dialog: FC<DialogProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className)

  const text: any = ''

  return <div className={rootClassName}></div>
}

export default Dialog
