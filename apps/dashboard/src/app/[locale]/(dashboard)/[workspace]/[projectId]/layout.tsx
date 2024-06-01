import type { ReactNode } from 'react'

import { cookies } from 'next/headers'

import { ProjectLayout } from '@/modules/project/components/project-layout'

type LayoutProps = {
  children: ReactNode
  params: { workspace: string; projectId: string }
}

export default async function Layout({ children, params }: LayoutProps) {
  const layout = cookies().get('react-resizable-panels:layout')
  const collapsed = cookies().get('react-resizable-panels:collapsed')

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined

  return (
    <ProjectLayout
      defaultCollapsed={defaultCollapsed}
      defaultLayout={defaultLayout}
      navCollapsedSize={4}
      projectId={params.projectId}
      workspace={params.workspace}
    >
      {children}
    </ProjectLayout>
  )
}
