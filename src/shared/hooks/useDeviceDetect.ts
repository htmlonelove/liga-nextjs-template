import { useWindowResize } from '@/shared/hooks'
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

export const useDeviceDetect = (breakpoints: {
  tablet: number
  desktop: number
}) => {
  const setDevice = useSetAtom(deviceWriteAtom)

  useWindowResize(({ windowWidth }) => {
    setDevice(getDeviceType(windowWidth, breakpoints))
  })
}
