'use client'

import { useEffect } from 'react'
import { DeviceSize, SCALING_BREAKPOINTS } from '@/shared/const'
import { useScaling } from '@/shared/hooks'
import { isDeviceAtom } from '@atoms/deviceAtom'
import { useAtomValue } from 'jotai'

export const Scaling = () => {
  const isDeviceDetected = useAtomValue(isDeviceAtom)

  useScaling({
    deviceBreakpoints: {
      tablet: DeviceSize.Tablet.PORTRAIT,
      desktop: DeviceSize.Desktop.SMALL
    },
    scalingBreakpoints: SCALING_BREAKPOINTS
  })

  useEffect(() => {
    if (isDeviceDetected) {
      document.body.classList.remove('loading')
    }
  }, [isDeviceDetected])

  return <></>
}
