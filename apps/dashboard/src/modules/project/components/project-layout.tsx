'use client'

import { useState, type ReactNode } from 'react'

import {
  ApiKeyBulk,
  EditorBulk,
  OverviewBulk,
  SettingBulk,
  SourceBulk,
} from '@languist/icons'
import type { Project } from '@languist/supabase/project'
import { cn } from '@languist/ui/cn'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@languist/ui/resizable'

import { useI18n } from '@/locales/client'
import { ProjectBreadcrumb } from '@/modules/project/components/project-breadcrumb'

import { ProjectNav } from './project-nav'

type ProjectLayoutProps = {
  children: ReactNode
  project: Project
  workspace: string
  defaultLayout: number[] | undefined
  defaultCollapsed?: boolean
  navCollapsedSize: number
}

export function ProjectLayout({
  children,
  project,
  workspace,
  defaultLayout = [265, 440, 655],
  defaultCollapsed = false,
  navCollapsedSize,
}: ProjectLayoutProps) {
  const t = useI18n()
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed)

  const rootProjectPath = `/${workspace}/${project.id}`

  return (
    <div className="flex flex-1 flex-col">
      <ProjectBreadcrumb project={project} />
      <ResizablePanelGroup
        className="h-full flex-1 items-stretch"
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes,
          )}`
        }}
      >
        <ResizablePanel
          collapsible
          collapsedSize={navCollapsedSize}
          defaultSize={defaultLayout[0]}
          maxSize={16}
          minSize={14}
          className={cn(
            'hidden lg:block',
            isCollapsed &&
              'min-w-[50px] transition-all duration-300 ease-in-out',
          )}
          onCollapse={() => {
            setIsCollapsed(true)
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              true,
            )}`
          }}
          onExpand={() => {
            setIsCollapsed(false)
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              false,
            )}`
          }}
        >
          <ProjectNav
            isCollapsed={isCollapsed}
            links={[
              {
                title: t('project.nav.overview'),
                href: `${rootProjectPath}`,
                icon: OverviewBulk,
              },
              {
                title: t('project.nav.editor'),
                href: `${rootProjectPath}/editor`,
                icon: EditorBulk,
              },
              {
                title: t('project.nav.source'),
                href: `${rootProjectPath}/source`,
                icon: SourceBulk,
              },
              {
                title: t('project.nav.api-keys'),
                href: `${rootProjectPath}/api-keys`,
                icon: ApiKeyBulk,
              },
              {
                title: t('project.nav.settings'),
                href: `${rootProjectPath}/settings`,
                icon: SettingBulk,
              },
            ]}
          />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel className="flex flex-1">{children}</ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
