import type { Metadata, Viewport } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { Toaster } from '@/components/ui/toaster'
import { DebugBar } from '@/components/shared/DebugBar'
import { ErrorBoundary } from '@/components/shared/ErrorBoundary'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SOQRS - QR Social & Carpooling Platform',
  description: 'QR-based social platform with park communication and minimal carpooling system',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'SOQRS',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: 'SOQRS',
    title: 'SOQRS - QR Social & Carpooling',
    description: 'QR-based social platform with park communication and carpooling',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOQRS',
    description: 'QR-based social platform',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icons/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/icons/icon.svg',
  },
}

export const viewport: Viewport = {
  themeColor: '#FF6B35',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/icon.svg" />
        {/* OneSignal - Add your APP_ID when ready */}
        {/* <script src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js" defer></script> */}
      </head>
      <body className={`${inter.variable} ${poppins.variable} antialiased`}>
        <ErrorBoundary>
          <Providers>
            {children}
            <Toaster />
            <DebugBar />
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  )
}
