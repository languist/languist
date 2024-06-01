'use client'

import { Fragment } from 'react'

import { CaretRight } from '@languist/icons'
import { useProject } from '@languist/queries'
import { cn } from '@languist/ui/cn'
import { Skeleton } from '@languist/ui/skeleton'
import Link from 'next/link'
import { useSelectedLayoutSegments } from 'next/navigation'

import { useI18n } from '@/locales/client'
import type { ANY } from '@/modules/common/any'

export function ProjectBreadcrumb({ projectId }: { projectId: string }) {
  const { data: currentProject } = useProject(projectId)
  const segments = useSelectedLayoutSegments()
  const t = useI18n()

  return (
    <div className="bg-muted animate-in fade-in fill-mode-both flex h-9 items-center gap-1 border-b px-4 text-xs delay-0 duration-1000">
      {!currentProject ? (
        <Skeleton className="bg-muted h-5 w-[100px] rounded-md" />
      ) : (
        <Link
          className={cn(segments.length && 'text-muted-foreground')}
          href="."
        >
          {currentProject.name}
        </Link>
      )}
      {segments.map((segment, index) => (
        <Fragment key={segment}>
          <CaretRight className="text-muted-foreground size-5" />
          <Link
            href={segment}
            className={cn(
              'animate-in fade-in fill-mode-both pr-2 delay-0 duration-1000',
              index !== segments.length - 1 && 'text-muted-foreground',
            )}
          >
            {t(`project.nav.${segment}` as ANY, {})}
          </Link>
        </Fragment>
      ))}
    </div>
  )
}
