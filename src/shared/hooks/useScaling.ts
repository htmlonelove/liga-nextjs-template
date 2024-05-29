'use client'

import { useEffect } from 'react'
import type { ScalingBreakpoint } from '@/shared/const'
import { DeviceAtomType, deviceWriteAtom } from '@atoms/deviceAtom'
import { useSetAtom } from 'jotai'

const getDeviceType = (
  windowWidth: number,
  breakpoints: { tablet: number; desktop: number }
): DeviceAtomType => {
  if (windowWidth < breakpoints.tablet) {
    return 'mobile'
  }

  if (windowWidth < breakpoints.desktop) {
    return 'tablet'
  }

  return 'desktop'
}

const getScaleFontSize = (
  windowWidth: number,
  breakpoints: ScalingBreakpoint[]
) => {
  const currentBreakpoint =
    breakpoints.find((breakpoint) =>
      breakpoint.size.min
        ? windowWidth >= breakpoint.size.min
        : windowWidth >= breakpoint.size.base
    ) || breakpoints[breakpoints.length - 1]

  const minFontSize = currentBreakpoint.fontSize?.min
  const maxFontSize = currentBreakpoint.fontSize?.max

  let size =
    (windowWidth / currentBreakpoint.size.base) *
    currentBreakpoint.fontSize.base

  if (minFontSize) {
    size = size > minFontSize ? size : minFontSize
  }

  if (maxFontSize) {
    size = size < maxFontSize ? size : maxFontSize
  }

  return Number(size.toFixed(2))
}

export const useScaling = ({
  deviceBreakpoints,
  scalingBreakpoints
}: {
  deviceBreakpoints: { tablet: number; desktop: number }
  scalingBreakpoints: ScalingBreakpoint[]
}) => {
  const setDevice = useSetAtom(deviceWriteAtom)

  useEffect(() => {
    const handleWindowResize = () => {
      if (!document || !window) {
        return
      }

      const htmlElement = document.documentElement

      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      htmlElement.style.fontSize = `${getScaleFontSize(viewportWidth, scalingBreakpoints)}px`
      htmlElement.style.setProperty('--vh', `${viewportHeight * 0.01}px`)

      setDevice(getDeviceType(viewportWidth, deviceBreakpoints))
    }

    handleWindowResize()
    window.addEventListener('resize', handleWindowResize)

    return () => window.removeEventListener('resize', handleWindowResize)
  }, [deviceBreakpoints, scalingBreakpoints, setDevice])
}
