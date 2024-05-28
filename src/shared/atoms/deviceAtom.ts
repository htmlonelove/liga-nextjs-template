import { atom } from 'jotai'

type DeviceAtomType = 'mobile' | 'tablet' | 'desktop'

const deviceAtom = atom<DeviceAtomType | undefined>(undefined)

export const setDeviceAtom = atom(null, (get, set, update: DeviceAtomType) => {
  set(deviceAtom, update)
})

export const isDesktopAtom = atom((get) => get(deviceAtom) === 'desktop')
export const isTabletAtom = atom((get) => get(deviceAtom) === 'tablet')
export const isMobileAtom = atom((get) => get(deviceAtom) === 'mobile')
export const isMobileDeviceAtom = atom((get) => get(deviceAtom) !== 'desktop')
export const isDeviceAtom = atom((get) => !!get(deviceAtom))
