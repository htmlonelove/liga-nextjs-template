'use client'

import { FC, ReactNode } from 'react'
import { Provider as JotaiProvider } from 'jotai'

import { ScalingLayout } from './scalingLayout'

export const ProviderLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <JotaiProvider>
        <ScalingLayout>{children}</ScalingLayout>
      </JotaiProvider>
    </>
  )
}
