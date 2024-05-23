'use client'

import { RefObject, useCallback, useEffect, useRef, useState } from 'react'

interface Callback<T extends Event = Event> {
  (event: T): void
}
type Refs = RefObject<HTMLElement>[]
type AnyEvent = MouseEvent | TouchEvent
interface Return {
  (element: HTMLElement | null): void
}

const useOnClickOutside = (callback: Callback, refs?: Refs): Return => {
  const [refsState, setRefsState] = useState<Refs>([])
  const callbackRef = useRef(callback)
  callbackRef.current = callback

  const ref: Return = useCallback(
    (el) => setRefsState((prevState) => [...prevState, { current: el }]),
    []
  )

  useEffect(() => {
    if (!refs?.length && !refsState.length) return

    const getEls = () => {
      const els: HTMLElement[] = []
      const targetRefs = refs || refsState
      targetRefs.forEach(({ current }) => current && els.push(current))
      return els
    }

    const handler = (e: AnyEvent) => {
      if (getEls().every((el) => !el.contains(e.target as Node)))
        callbackRef.current(e)
    }

    document.addEventListener(`mousedown`, handler)
    // document.addEventListener(`touchstart`, handler)
    return () => {
      document.removeEventListener(`mousedown`, handler)
      // document.removeEventListener(`touchstart`, handler)
    }
  }, [refs, refsState])

  return ref
}

export default useOnClickOutside
