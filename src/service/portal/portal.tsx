import { FC, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'

import { Props } from './portal.types'

const subscribe = () => () => {}

const Portal: FC<Props> = ({ children, selector }) => {
  const target = useSyncExternalStore(
    subscribe,
    () => document.querySelector(selector),
    () => null
  )

  return target ? createPortal(children, target) : null
}

export default Portal
