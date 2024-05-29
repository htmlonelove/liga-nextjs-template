'use client'

import { FC, ReactNode } from 'react'
import { DeviceSize, SCALING_BREAKPOINTS } from '@/shared/const'
import { useDeviceDetect, useScaling, useVH } from '@/shared/hooks'
import { isDeviceAtom } from '@atoms/deviceAtom'
import { Provider as JotaiProvider, useAtom } from 'jotai'

const ScalingLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const [isDeviceDetected] = useAtom(isDeviceAtom)

  useDeviceDetect({
    tablet: DeviceSize.Tablet.PORTRAIT,
    desktop: DeviceSize.Desktop.SMALL
  })
  useScaling(SCALING_BREAKPOINTS)
  useVH()

  return isDeviceDetected ? children : <></>
}

export const Provider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <JotaiProvider>
      <ScalingLayout>{children}</ScalingLayout>
    </JotaiProvider>
  )
}
