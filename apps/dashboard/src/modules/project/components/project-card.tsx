import { ArrowRight, ProjectBulk } from '@languist/icons'
import type { Project } from '@languist/supabase/project'
import { Card, CardContent, CardFooter } from '@languist/ui/card'
import { formatRelative } from 'date-fns/formatRelative'
import Link from 'next/link'
import { CircleFlagLanguage } from 'react-circle-flags'

import { getI18n } from '@/locales/server'

export type ProjectCardProps = {
  data: Project
  workspace: string
}

export async function ProjectCard({ data, workspace }: ProjectCardProps) {
  const t = await getI18n()
  return (
    <Link className="grid" href={{ pathname: `${workspace}/${data.id}` }}>
      <Card className="bg-muted group flex flex-col border-none p-1 pb-0 shadow-none">
        <CardContent className="bg-background relative flex flex-1 flex-col justify-end rounded-lg px-3 py-2 shadow-sm">
          <ProjectBulk className="text-primary absolute left-3 top-3 size-8" />
          <div className="mb-1 flex items-center gap-1 self-start rounded-md border border-dashed p-1">
            {data.languages?.length ? (
              data.languages.map((lang) => (
                <CircleFlagLanguage
                  key={lang.language}
                  className="size-4"
                  languageCode={lang.language}
                />
              ))
            ) : (
              <CircleFlagLanguage
                className="size-4"
                languageCode={data.source_language!}
              />
            )}
          </div>
          <h3 className="text-lg font-semibold">{data.name}</h3>
        </CardContent>
        <CardFooter className="text-muted-foreground flex h-8 justify-between overflow-hidden px-3 py-2 text-xs">
          <span className="line-clamp-1 transition ease-[cubic-bezier(0.2,0.4,0,1)] group-hover:-translate-x-[calc(100%+theme(spacing.4))] group-has-[a:focus-visible]:-translate-x-[calc(100%+theme(spacing.4))] motion-reduce:duration-0">
            {t('project.updatedAt', {
              date: formatRelative(
                new Date(
                  data.last_translation?.[0]?.created_at
                    ? data.last_translation[0].created_at
                    : data.created_at,
                ),
                new Date(),
              ),
            })}
          </span>
          <span className="line-clamp-1 flex flex-shrink-0 translate-x-[calc(100%+theme(spacing.4))] items-center gap-1 font-medium transition ease-[cubic-bezier(0.2,0.4,0,1)] group-hover:translate-x-0 group-has-[a:focus-visible]:translate-x-0 motion-reduce:duration-0">
            {t('project.goToProject')}
            <ArrowRight className="size-4" />
          </span>
        </CardFooter>
      </Card>
    </Link>
  )
}
