'use client'

import { FC, ReactNode } from 'react'
import { useScaling } from '@/shared/hooks'

export const ScalingLayout: FC<{ children: ReactNode }> = ({ children }) => {
  useScaling()

  return <>{children}</>
}
