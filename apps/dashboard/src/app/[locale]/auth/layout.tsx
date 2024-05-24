'use client'

import type { ReactNode } from 'react'

import { useAuth } from '@languist/auth'
import { AppLoader } from '@languist/ui/app-loader'

type LayoutProps = {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { isLoading } = useAuth()

  if (isLoading) {
    return <AppLoader />
  }

  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden p-4">
      <div className="bg-auth-pattern absolute -top-24 mx-auto h-[800px] w-[800px] bg-no-repeat dark:opacity-10" />
      <div className="relative flex flex-col gap-4 md:gap-8">{children}</div>
    </div>
  )
}
