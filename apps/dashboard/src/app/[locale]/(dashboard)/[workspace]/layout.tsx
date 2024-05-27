'use client'

import type { ReactNode } from 'react'

import { DashboardLayout } from '@/modules/common/layouts/dashboard-layout'

type LayoutProps = {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return <DashboardLayout>{children}</DashboardLayout>
}
