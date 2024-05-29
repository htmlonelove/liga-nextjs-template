import { useWindowResize } from '@/shared/hooks'

export const useVH = () => {
  useWindowResize(({ windowHeight }) => {
    if (document) {
      document.documentElement.style.setProperty(
        '--vh',
        `${windowHeight * 0.01}px`
      )
    }
  })
}
