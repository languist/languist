'use client'

import { Logo } from '@languist/ui/logo'
import { Separator } from '@languist/ui/separator'
import Link from 'next/link'
import { useSelectedLayoutSegments } from 'next/navigation'

import { ProjectDropdownMenu } from './project-dropdown-menu'
import { WorkspaceDropdownMenu } from './workspace-dropdown-menu'

export function DashboardBreadcrumb() {
  const segments = useSelectedLayoutSegments()

  const [workspace, projectId] = segments

  return (
    <div className="flex items-center gap-2">
      <Link
        className="animate-in fade-in fill-mode-both pr-2 delay-0 duration-1000"
        href="/"
      >
        <Logo size="sm" />
      </Link>
      {workspace && (
        <>
          <Separator className="h-5 rotate-12" orientation="vertical" />
          <WorkspaceDropdownMenu workspace={workspace} />
          {projectId && (
            <>
              <Separator className="h-5 rotate-12" orientation="vertical" />
              <ProjectDropdownMenu
                projectId={projectId}
                workspace={workspace}
              />
            </>
          )}
        </>
      )}
    </div>
  )
}
