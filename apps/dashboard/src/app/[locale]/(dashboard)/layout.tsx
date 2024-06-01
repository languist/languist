'use client'

import type { ReactNode } from 'react'

import { AppLoader } from '@languist/ui/app-loader'

import { useInitApp } from '@/modules/common/hooks/use-init-app'
import { DashboardLayout } from '@/modules/common/layouts/dashboard-layout'

type LayoutProps = {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { isInitializing } = useInitApp()

  if (isInitializing) {
    return <AppLoader />
  }

  return <DashboardLayout>{children}</DashboardLayout>
}
