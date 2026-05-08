'use client'

import { useEffect } from 'react'
import { DeviceSize, SCALING_BREAKPOINTS } from '@/shared/const'
import { useScaling } from '@/shared/hooks'
import { isDeviceAtom } from '@atoms/deviceAtom'
import { useAtomValue } from 'jotai'

const DEVICE_BREAKPOINTS = {
  tablet: DeviceSize.Tablet.PORTRAIT,
  desktop: DeviceSize.Desktop.SMALL
}

export const Scaling = () => {
  const isDeviceDetected = useAtomValue(isDeviceAtom)

  useScaling({
    deviceBreakpoints: DEVICE_BREAKPOINTS,
    scalingBreakpoints: SCALING_BREAKPOINTS
  })

  useEffect(() => {
    if (isDeviceDetected) {
      document.body.classList.remove('loading')
    }
  }, [isDeviceDetected])

  return <></>
}
