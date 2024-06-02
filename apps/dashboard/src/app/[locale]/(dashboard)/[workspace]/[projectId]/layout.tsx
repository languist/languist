import type { ReactNode } from 'react'

import { getCachedProject } from '@languist/queries'
import { cookies } from 'next/headers'

import { ProjectLayout } from '@/modules/project/components/project-layout'

type LayoutProps = {
  children: ReactNode
  params: { workspace: string; projectId: string }
}

export default async function Layout({ children, params }: LayoutProps) {
  const project = await getCachedProject(params.projectId)
  const layout = cookies().get('react-resizable-panels:layout')
  const collapsed = cookies().get('react-resizable-panels:collapsed')

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined

  return (
    <ProjectLayout
      defaultCollapsed={defaultCollapsed}
      defaultLayout={defaultLayout}
      navCollapsedSize={4}
      project={project}
      workspace={params.workspace}
    >
      {children}
    </ProjectLayout>
  )
}
