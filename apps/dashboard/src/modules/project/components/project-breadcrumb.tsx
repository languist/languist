'use client'

import { Fragment } from 'react'

import { CaretRight } from '@languist/icons'
import type { Project } from '@languist/supabase/project'
import { cn } from '@languist/ui/cn'
import Link from 'next/link'
import { useSelectedLayoutSegments } from 'next/navigation'

import { useI18n } from '@/locales/client'
import type { ANY } from '@/modules/common/any'

export function ProjectBreadcrumb({ project }: { project: Project }) {
  const segments = useSelectedLayoutSegments()
  const t = useI18n()

  return (
    <div className="bg-muted sticky top-16 z-10 flex h-9 items-center gap-1 border-b px-4 text-xs">
      <Link
        href="."
        className={cn(
          'animate-in fade-in fill-mode-both delay-0 duration-1000',
          segments.length && 'text-muted-foreground',
        )}
      >
        {project.name}
      </Link>
      {segments.map((segment, index) => (
        <Fragment key={segment}>
          <CaretRight className="text-muted-foreground animate-in fade-in fill-mode-both flex size-6 flex-shrink-0 delay-100 duration-1000" />
          <Link
            href={segment}
            className={cn(
              'animate-in fade-in fill-mode-both delay-200 duration-1000',
              index !== segments.length - 1 && 'text-muted-foreground',
            )}
          >
            {t(`project.nav.${segment}` as ANY, {
              count: 0,
            })}
          </Link>
        </Fragment>
      ))}
    </div>
  )
}
