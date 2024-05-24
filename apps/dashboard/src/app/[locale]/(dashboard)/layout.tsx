'use client'

import type { ReactNode } from 'react'

import { AppLoader } from '@languist/ui/app-loader'

import { useInitApp } from '../../../modules/common/use-init-app'

type LayoutProps = {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { isInitializing } = useInitApp()

  if (isInitializing) {
    return <AppLoader />
  }

  return children
}
