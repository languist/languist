/* eslint-disable react/no-unknown-property */

'use client'

import { QueryClientProvider } from '@languist/queries'
import { TooltipProvider } from '@languist/ui/tooltip'

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
            <TooltipProvider delayDuration={0}>
              <div className="bg-background" vaul-drawer-wrapper="">
                {children}
              </div>
            </TooltipProvider>
          </ThemeProvider>
        </I18nProviderClient>
      </AuthProvider>
    </QueryClientProvider>
  )
}
