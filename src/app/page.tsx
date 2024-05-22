import { HomeView } from '@views/home'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Liga A Next.js template'
}

export default function Home() {
  return <HomeView />
}
