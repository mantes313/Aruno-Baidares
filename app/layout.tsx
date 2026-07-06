import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Baidarių Nuoma Marijampolėje | 6upė – Baidarių Nuoma Suvalkijoje',
  description: 'Baidarių nuoma Marijampolėje ir Suvalkijoje. Plaukite Šešupe – Jungėnai–Bukta, Bukta–Liudvinavas, Liudvinavas–Marijampolė. Rezervuokite internetu!',
  keywords: [
    'baidarės Marijampolė',
    'baidarių nuoma Marijampolė',
    'baidarės Suvalkija',
    'baidarių nuoma Suvalkija',
    'baidarių nuoma Šešupė',
    'baidarės Liudvinavas',
    'kayak nuoma Marijampolė',
    'plaukimas baidarėmis Lietuva',
    'baidarių nuoma',
    '6upė',
  ],
  openGraph: {
    title: 'Baidarių Nuoma Marijampolėje | 6upė',
    description: 'Plaukite Šešupe su 6upė! Baidarių nuoma Marijampolėje ir Suvalkijoje. 3 maršrutai, paprasta rezervacija internetu.',
    locale: 'lt_LT',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="lt" className="bg-background">
      <body className="font-sans antialiased overflow-x-hidden">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
