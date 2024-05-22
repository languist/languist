'use client'

import type { ReactNode } from 'react'

import { I18nProviderClient } from '@/locales/client'
import { ThemeProvider } from '@/modules/common/theme-provider'

type ProviderProps = {
  locale: string
  children: ReactNode
}

export function Providers({ locale, children }: ProviderProps) {
  return (
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
  )
}
