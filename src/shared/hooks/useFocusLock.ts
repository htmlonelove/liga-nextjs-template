import {
  MutableRefObject,
  useEffect
} from 'react'

import { KeyCode } from '@/shared/const'

const SELECTORS = [
  'a[href]:not([tabindex^="-1"])',
  'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
  'select:not([disabled]):not([aria-hidden])',
  'textarea:not([disabled]):not([aria-hidden])',
  'button:not([disabled]):not([aria-hidden]):not([tabindex^="-1"])',
  'iframe',
  'object',
  'embed',
  '[contenteditable]',
  '[tabindex]:not([tabindex^="-1"])'
].join(', ')

const useFocusLock = (lockerRef: MutableRefObject<HTMLDivElement | null>) => {
  useEffect(() => {
    const starter = document.activeElement as HTMLElement

    const onDocumentKeydown = (evt: KeyboardEvent) => {
      if (lockerRef.current && evt.key === KeyCode.Tab) {
        const focusableItems = Array.from(
          lockerRef.current.querySelectorAll(SELECTORS)
        ).filter((item) => getComputedStyle(item).display !== 'none') as HTMLElement[]

        if (!focusableItems.length) {
          return
        }

        if (lockerRef.current.contains(document.activeElement)) {
          const focusedItemIndex = focusableItems.indexOf(document.activeElement as HTMLElement)
          const lastFocusableItemIndex = focusableItems.length - 1

          if (focusedItemIndex === lastFocusableItemIndex && !evt.shiftKey) {
            focusableItems[0].focus()
            evt.preventDefault()
          }

          if (focusedItemIndex === 0 && evt.shiftKey) {
            focusableItems[lastFocusableItemIndex].focus()
            evt.preventDefault()
          }
        } else {
          focusableItems[0].focus()
          evt.preventDefault()
        }
      }
    }

    document.addEventListener('keydown', onDocumentKeydown)   

    return () => {
      document.removeEventListener('keydown', onDocumentKeydown)

      if (starter) {
        starter.focus()
      }
    }
  }, [lockerRef])
}

export default useFocusLock
