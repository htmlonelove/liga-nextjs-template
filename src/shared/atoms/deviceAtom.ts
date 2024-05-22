import { atom } from 'jotai'

export type DeviceAtomType = 'mobile' | 'tablet' | 'desktop'

const deviceAtom = atom<DeviceAtomType | undefined>(undefined)

export const setDeviceAtom = atom(null, (get, set, update: DeviceAtomType) => {
  set(deviceAtom, update)
})

export const isDesktopDevice = atom((get) => get(deviceAtom) === 'desktop')
export const isMobileDevice = atom((get) => get(deviceAtom) !== 'desktop')
