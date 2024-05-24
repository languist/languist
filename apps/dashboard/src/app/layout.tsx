import { Toaster } from '@languist/ui/sonner'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import '@languist/ui/globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Languist | Localization management platform',
  description:
    "Seamlessly manage your app's localization, collaborate with your team, and automate translation workflows.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
