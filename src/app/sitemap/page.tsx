import { SitemapView } from '@views/sitemap'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sitemap',
  description: 'Liga A Next.js template'
}

export default function Sitemap() {
  return <SitemapView />
}
