import { ReactNode } from 'react'
import { Footer } from '@modules/footer'
import { Header } from '@modules/header'

import '@styles/global.scss'

import localFont from 'next/font/local'

const font = localFont({
  src: [
    {
      path: './fonts/neuemachina-light.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: './fonts/neuemachina-regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: './fonts/neuemachina-medium.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: './fonts/neuemachina-ultrabold.woff2',
      weight: '800',
      style: 'normal'
    }
  ]
})

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={font.className}>
        <div id="root">
          <Header />
          {children}
          <Footer />
        </div>
        <div id="modal-root" />
      </body>
    </html>
  )
}
