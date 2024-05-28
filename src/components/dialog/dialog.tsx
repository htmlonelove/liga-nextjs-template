import { FC, useRef } from 'react'
import { Portal } from '@/service/portal'
import {
  useFocusLock,
  useOnClickOutside,
  useOnEscKeydown,
  useScrollLock
} from '@/shared/hooks'
import { Button } from '@/ui'
import classNames from 'classnames'

import styles from './dialog.module.scss'
import { DialogProps } from './dialog.types'

const Dialog: FC<DialogProps> = ({ className, onClose }) => {
  const rootClassName = classNames(styles.root, className)

  const rootRef = useRef<HTMLDivElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)

  useScrollLock()
  useFocusLock(rootRef)
  useOnClickOutside(contentRef, onClose)
  useOnEscKeydown(onClose)

  return (
    <Portal selector={'#modal-root'}>
      <div ref={rootRef} className={rootClassName}>
        <div ref={contentRef} className={styles.content}>
          <div className={styles.buttons}>
            <Button>Action</Button>

            <Button onClick={onClose}>Close</Button>
          </div>
        </div>
      </div>
    </Portal>
  )
}

export default Dialog
