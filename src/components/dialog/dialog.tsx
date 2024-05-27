import {
  FC,
  useState,
  useRef,
  useEffect
} from 'react'
import { createPortal } from 'react-dom'
import classNames from 'classnames'

import {
  useScrollLock,
  useFocusLock,
  useOnClickOutside,
  useOnEscKeydown
} from '@/shared/hooks'
import { Button } from '@/ui'

import styles from './dialog.module.scss'
import { DialogProps } from './dialog.types'

const Dialog: FC<DialogProps> = ({
  className,
  onClose
}) => {
  const rootClassName = classNames(styles.root, className)

  const [mounted, setMounted] = useState<boolean>(true)
  const [rootRef, setRootRef] = useState<HTMLElement | null>(null)

  const portalTargetRef = useRef<Element | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)

  const handleClose = () => {
    setMounted(false)
    onClose()
  }

  useEffect(() => {
    const target = document.querySelector('#modal-root')

    if (target) {
      portalTargetRef.current = target

      setMounted(true)
    }
  }, [])

  useScrollLock()
  useFocusLock(rootRef)
  useOnClickOutside(contentRef, handleClose)
  useOnEscKeydown(handleClose)

  return mounted && portalTargetRef.current ?
    createPortal(
      <div
        ref={(node) => setRootRef(node)}
        className={rootClassName}
      >
        <div
          ref={contentRef}
          className={styles.content}
        >
          <div className={styles.buttons}>
            <Button>
              Action
            </Button>

            <Button onClick={handleClose}>
              Close
            </Button>
          </div>
        </div>
      </div>,
      portalTargetRef.current
    )
    : null
}

export default Dialog
