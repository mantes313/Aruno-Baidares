import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://6upe.lt'),
  title: {
    default: 'Baidarių Nuoma Marijampolėje ir Suvalkijoje | 6upė',
    template: '%s | 6upė – Baidarių Nuoma',
  },
  description: 'Baidarių nuoma Marijampolėje ir visoje Suvalkijoje. Plaukite Šešupe – Jungėnai–Bukta, Bukta–Liudvinavas, Liudvinavas–Marijampolė. Įranga, instruktažas, rezervacija internetu.',
  keywords: [
    'baidarės Marijampolė',
    'baidarių nuoma Marijampolė',
    'baidarės Suvalkija',
    'baidarių nuoma Suvalkija',
    'baidarių nuoma Šešupė',
    'baidarės Liudvinavas',
    'baidarių nuoma Liudvinavas',
    'baidarės Šešupė',
    'kayak nuoma Marijampolė',
    'kur išsinuomoti baidarę Marijampolėje',
    'baidarių nuoma savaitgaliui Suvalkijoje',
    'plaukimas baidarėmis Lietuva',
    'baidarių nuoma',
    '6upė',
  ],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Baidarių Nuoma Marijampolėje ir Suvalkijoje | 6upė',
    description: 'Plaukite Šešupe su 6upė! Baidarių nuoma Marijampolėje ir Suvalkijoje. 3 maršrutai, paprasta rezervacija internetu.',
    url: 'https://6upe.lt',
    siteName: '6upė – Baidarių Nuoma',
    locale: 'lt_LT',
    type: 'website',
    images: [
      {
        url: '/marsrutas-2.jpg',
        width: 1200,
        height: 630,
        alt: 'Baidarių nuoma Marijampolėje ir Suvalkijoje – 6upė',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Baidarių Nuoma Marijampolėje ir Suvalkijoje | 6upė',
    description: 'Baidarių nuoma Marijampolėje ir visoje Suvalkijoje. Plaukite Šešupe – rezervuokite internetu.',
    images: ['/marsrutas-2.jpg'],
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
