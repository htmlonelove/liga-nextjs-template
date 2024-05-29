import { useCallback, useEffect } from 'react'
import { useEventListener } from '@/shared/hooks'

type Callback = ({
  windowWidth,
  windowHeight
}: {
  windowWidth: number
  windowHeight: number
}) => void

export const useWindowResize = (callback: Callback) => {
  const handleWindowResize = useCallback(() => {
    if (window) {
      callback({
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight
      })
    }
  }, [callback])

  useEventListener('resize', handleWindowResize)

  useEffect(() => {
    handleWindowResize()
  }, [handleWindowResize])
}
