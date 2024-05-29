'use client'

import { useEffect } from 'react'
import { useSetAtom } from 'jotai'
import { DeviceAtomType, deviceWriteAtom } from '@atoms/deviceAtom'

const BASE_FONT_SIZE = 16

const deviceSize = {
  mobile: {
    small: 320,
    medium: 375,
    large: 425
  },
  tablet: {
    portrait: 768,
    landscape: 1024
  },
  desktop: {
    small: 1280,
    medium: 1440,
    large: 1920
  }
}

const breakpoints: {
  size: { min?: number, base: number },
  fontSize?: { min?: number, max?: number }
}[] = [
  {
    size: { min: deviceSize.desktop.small, base: deviceSize.desktop.medium },
    fontSize: { min: 14, max: 16 }
  }, {
    size: { base: deviceSize.tablet.landscape },
    fontSize: { max: 18 }
  }, {
    size: { base: deviceSize.tablet.portrait },
    fontSize: { max: 18 }
  }, {
    size: { base: deviceSize.mobile.medium },
    fontSize: { min: 14 }
  }
]

const getDeviceType = (windowWidth: number): DeviceAtomType => {
  if (windowWidth <= deviceSize.tablet.portrait) {
    return 'mobile'
  }

  if (windowWidth <= deviceSize.tablet.landscape) {
    return 'tablet'
  }

  return 'desktop'
}

const getScaleFontSize = (windowWidth: number) => {
  const currentBreakpoint =
    breakpoints.find(
      (breakpoint) => breakpoint.size.min ? windowWidth >= breakpoint.size.min : windowWidth >= breakpoint.size.base
    ) ||
    breakpoints[breakpoints.length - 1]

  const minFontSize = currentBreakpoint.fontSize?.min
  const maxFontSize = currentBreakpoint.fontSize?.max

  let size = (windowWidth / currentBreakpoint.size.base) * BASE_FONT_SIZE

  if (minFontSize) {
    size = size > minFontSize ? size : minFontSize
  }
  
  if (maxFontSize) {
    size = size < maxFontSize ? size : maxFontSize
  }

  return Number(size.toFixed(2))
}

export const useScaling = () => {
  const setDevice = useSetAtom(deviceWriteAtom)

  useEffect(() => {
    const handleWindowResize = () => {
      if (!document || !window) {
        return
      }

      const htmlElement = document.documentElement

      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      htmlElement.style.fontSize = `${getScaleFontSize(viewportWidth)}px`
      htmlElement.style.setProperty('--vh', `${viewportHeight * 0.01}px`)

      setDevice(
        getDeviceType(viewportWidth)
      )
    }

    handleWindowResize()
    window.addEventListener('resize', handleWindowResize)

    return () => window.removeEventListener('resize', handleWindowResize)
  }, [setDevice])
}
