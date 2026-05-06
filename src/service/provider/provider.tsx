'use client'

import { FC, ReactNode } from 'react'
import { Scaling } from '@service/scaling'
import { Provider as JotaiProvider } from 'jotai'

export const Provider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <JotaiProvider>
      <Scaling />
      {children}
    </JotaiProvider>
  )
}
