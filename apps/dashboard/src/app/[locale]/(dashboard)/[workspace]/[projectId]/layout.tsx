import type { ReactNode } from 'react'

import { ProjectBreadcrumb } from '@/modules/project/components/project-breadcrumb'

type LayoutProps = {
  children: ReactNode
  params: { projectId: string }
}

export default async function Layout({ children, params }: LayoutProps) {
  return (
    <div>
      <ProjectBreadcrumb projectId={params.projectId} />
      {children}
    </div>
  )
}
