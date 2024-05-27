import { useEffect, useRef } from 'react'
import { KeyCode } from '@/shared/const'

type Handler = () => void

export const useOnEscKeydown = (handler: Handler) => {
  const handlerRef = useRef<Handler>(handler)

  useEffect(() => {
    const onDocumentKeydown = (evt: KeyboardEvent) => {
      if (evt.key === KeyCode.Escape) {
        evt.preventDefault()

        handlerRef.current()
      }
    }

    document.addEventListener('keydown', onDocumentKeydown)

    return () => {
      document.removeEventListener('keydown', onDocumentKeydown)
    }
  }, [])
}

export default useOnEscKeydown
