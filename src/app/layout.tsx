import { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import { Footer } from '@modules/footer'
import { Header } from '@modules/header'

import '@styles/global.scss'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <div id="root">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
        <div id="modal-root" />
      </body>
    </html>
  )
}
