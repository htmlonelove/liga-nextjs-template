'use client'

import { useEffect } from 'react'
import { DeviceAtomType, deviceWriteAtom } from '@atoms/deviceAtom'
import { useAtom } from 'jotai'

const BASE_FONT_SIZE = 16

const deviceSize = {
  mobileS: 320,
  mobileM: 390,
  mobileL: 480,
  tabletS: 767,
  tablet: 1023,
  laptop: 1599,
  desktop: 1600,
  fhd: 1920,
  uhd: 2560
}

const breakpointsArray = [
  {
    size: deviceSize.laptop,
    noScaleSize: deviceSize.laptop
  },
  {
    size: deviceSize.tablet,
    upscaleSize: deviceSize.laptop
  },
  {
    size: deviceSize.tabletS
  },
  {
    size: deviceSize.mobileM
  }
]

const getScaleFontSize = (
  windowWidth: number,
  minSize?: number,
  maxSize?: number
) => {
  const currentBreakpoint =
    breakpointsArray.find((item) => item.size < windowWidth) ||
    breakpointsArray[breakpointsArray.length - 1]
  const contentWidth = currentBreakpoint.noScaleSize
    ? currentBreakpoint.size
    : windowWidth <= deviceSize.uhd
      ? windowWidth
      : deviceSize.uhd

  const breakpointSize =
    currentBreakpoint.noScaleSize ||
    currentBreakpoint.upscaleSize ||
    currentBreakpoint.size

  let size = (contentWidth / breakpointSize) * BASE_FONT_SIZE
  if (minSize) {
    size = size < minSize ? minSize : size
  }
  if (maxSize) {
    size = size < maxSize ? size : maxSize
  }

  return size.toFixed(2)
}

const useScaling = () => {
  const [, setDevice] = useAtom(deviceWriteAtom)

  useEffect(() => {
    const handleWindowResize = () => {
      const viewportWidth = window.innerWidth
      const htmlElement = document.querySelector('html')
      const vh = window.innerHeight * 0.01
      let device: DeviceAtomType = 'desktop'

      if (window.innerWidth <= deviceSize.tabletS) {
        device = 'mobile'
      } else if (window.innerWidth <= deviceSize.tablet) {
        device = 'tablet'
      }

      let maxSize = device === 'desktop' ? 16 : undefined

      if (
        device !== 'desktop' &&
        screen.orientation?.type === 'landscape-primary'
      ) {
        maxSize = 14
      }

      if (htmlElement) {
        const globalFontSize =
          viewportWidth !== null
            ? Number(getScaleFontSize(viewportWidth, 13, maxSize))
            : BASE_FONT_SIZE
        htmlElement.style.fontSize = `${globalFontSize}px`
      }

      setDevice(device)
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }

    window.addEventListener('resize', handleWindowResize)
    handleWindowResize()
    return () => window.removeEventListener('resize', handleWindowResize)
  }, [])
}

export default useScaling
