import type { Metadata } from 'next'
import { HomeView } from '@views/home'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Liga A Next.js template'
}

export default function Home() {
  return <HomeView />
}
