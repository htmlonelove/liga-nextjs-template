import { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import '@styles/global.scss'
import { Header } from '@modules/header'
import { Footer } from '@modules/footer'

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
