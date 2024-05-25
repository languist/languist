'use client'

import { QueryClientProvider } from '@languist/queries'

import { I18nProviderClient } from '@/locales/client'
import { AuthProvider } from '@/modules/auth/auth-provider'
import { ThemeProvider } from '@/modules/common/theme-provider'

type ProviderProps = {
  locale: string
  children: React.ReactNode
}

export function Providers({ locale, children }: ProviderProps) {
  return (
    <QueryClientProvider>
      <AuthProvider>
        <I18nProviderClient locale={locale}>
          <ThemeProvider
            disableTransitionOnChange
            enableSystem
            attribute="class"
            defaultTheme="system"
          >
            {children}
          </ThemeProvider>
        </I18nProviderClient>
      </AuthProvider>
    </QueryClientProvider>
  )
}
