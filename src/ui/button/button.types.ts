import { ComponentProps, ElementType, ReactNode } from 'react'

type ButtonColorSchemeType = 'black' | 'white'

type ButtonSizeType = 'md' | 'sm'

type ButtonOwnProps<E extends ElementType = ElementType> = {
  as?: E
  isRouteLink?: boolean
  colorScheme?: ButtonColorSchemeType
  size?: ButtonSizeType
  className?: string
  children?: string | ReactNode
}

export type ButtonProps<E extends ElementType> = ButtonOwnProps<E> &
  Omit<ComponentProps<E>, keyof ButtonOwnProps>
