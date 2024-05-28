'use client'

import { FC, ReactNode } from 'react'
import { isDeviceAtom } from '@atoms/deviceAtom'
import { useScaling } from '@hooks/index'
import { Provider as JotaiProvider, useAtom } from 'jotai'

const ScalingLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const [isDeviceDetected] = useAtom(isDeviceAtom)

  useScaling()

  return isDeviceDetected ? children : <></>
}

export const Provider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <JotaiProvider>
      <ScalingLayout>{children}</ScalingLayout>
    </JotaiProvider>
  )
}
