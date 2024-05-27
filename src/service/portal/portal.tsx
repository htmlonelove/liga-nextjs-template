import {
  FC,
  useEffect,
  useRef,
  useState
} from 'react'
import { createPortal } from 'react-dom'

import { Props } from './portal.types'


const Portal: FC<Props> = ({
  children,
  selector
}) => {
  const [mounted, setMounted] = useState<boolean>(false)

  const targetRef = useRef<Element | null>(null)

  useEffect(() => {
    const target = document.querySelector(selector)

    if (target) {
      targetRef.current = target

      setMounted(true)
    }
  }, [selector])

  return mounted && targetRef.current ?
    createPortal(children, targetRef.current)
    : null
}

export default Portal
