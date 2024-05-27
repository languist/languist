'use server'

import type { ReactNode } from 'react'

import { DashboardLayout } from '@/modules/common/layouts/dashboard-layout'

type LayoutProps = {
  children: ReactNode
}

export default async function Layout({ children }: LayoutProps) {
  return <DashboardLayout>{children}</DashboardLayout>
}
