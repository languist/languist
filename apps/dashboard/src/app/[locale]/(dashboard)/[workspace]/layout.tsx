'use server'

import type { ReactNode } from 'react'

type LayoutProps = {
  children: ReactNode
}

export default async function Layout({ children }: LayoutProps) {
  return children
}
