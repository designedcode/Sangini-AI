import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import AppProvider from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sangini AI - AI Companion Chat',
  description: 'AI companion chat in Indian languages with voice calling and personalized conversations',
  manifest: '/manifest.webmanifest',
  themeColor: '#000000',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Sangini AI'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Sangini AI" />
        <link rel="apple-touch-icon" href="/icon-192.svg" />
      </head>
      <body className={`${inter.className} bg-white`}>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  )
}
