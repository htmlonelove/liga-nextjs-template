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

/**
 * Вычисляет размер шрифта (в px) для тега html на текущей ширине вьюпорта.
 *
 * Массив брейкпоинтов ожидается отсортированным от большего `size.base` к меньшему.
 * Активным считается первый брейкпоинт, у которого `windowWidth` ≥ `size.min`
 * (если задан) либо `size.base`. Если ни один не подошёл — берётся последний
 * (самый мелкий) как фолбэк.
 *
 * Размер масштабируется пропорционально: `windowWidth / size.base * fontSize.base`
 * — так дизайн, свёрстанный на `size.base`, линейно подстраивается под текущий экран.
 * Опциональные `fontSize.min` и `fontSize.max` ограничивают результат снизу и сверху,
 * чтобы избежать слишком мелкого или чрезмерно крупного шрифта за пределами брейкпоинта.
 *
 * @param windowWidth ширина вьюпорта в px
 * @param breakpoints конфигурация брейкпоинтов скейлинга
 * @returns размер шрифта в px, округлённый до двух знаков
 */
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
