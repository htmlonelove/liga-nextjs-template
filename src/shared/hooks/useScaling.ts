import type { ScalingBreakpoint } from '@/shared/const'
import { useWindowResize } from '@/shared/hooks'

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

export const useScaling = (breakpoints: ScalingBreakpoint[]) => {
  useWindowResize(({ windowWidth }) => {
    if (document) {
      document.documentElement.style.fontSize = `${getScaleFontSize(windowWidth, breakpoints)}px`
    }
  })
}
