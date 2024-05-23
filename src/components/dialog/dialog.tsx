import { FC } from 'react'
import classNames from 'classnames'

import styles from './dialog.module.scss'
import { DialogProps } from './dialog.types'

const Dialog: FC<DialogProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className)

  return <div className={rootClassName}></div>
}

export default Dialog
