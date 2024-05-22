'use client'

import { FC, ReactNode } from 'react'
import { Provider } from 'jotai'

const ProviderLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <Provider>{children}</Provider>
)

export default ProviderLayout
