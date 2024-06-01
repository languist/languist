'use client'

import { useProject } from '@languist/queries'
import { Skeleton } from '@languist/ui/skeleton'
import Link from 'next/link'
import { useSelectedLayoutSegments } from 'next/navigation'

export function ProjectBreadcrumb({ projectId }: { projectId: string }) {
  const { data: currentProject } = useProject(projectId)
  const segments = useSelectedLayoutSegments()

  return (
    <div className="bg-muted animate-in fade-in fill-mode-both flex h-9 items-center border-b px-4 text-xs delay-0 duration-1000">
      {!currentProject ? (
        <Skeleton className="bg-muted h-5 w-[100px] rounded-md" />
      ) : (
        <div>{currentProject.name}</div>
      )}
      {segments.map((segment) => (
        <Link
          key={segment}
          className="animate-in fade-in fill-mode-both pr-2 delay-0 duration-1000"
          href={segment}
        >
          {segment}
        </Link>
      ))}
    </div>
  )
}
