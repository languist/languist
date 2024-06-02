import {
  ArrowRight,
  ExportBulk,
  HorizontalDotsBulk,
  UploadFileBulk,
} from '@languist/icons'
import { useLastEditedTranslationByProjectLanguage } from '@languist/queries'
import type { Project, ProjectLanguage } from '@languist/supabase/project'
import { Badge } from '@languist/ui/badge'
import { Button } from '@languist/ui/button'
import { Card, CardContent, CardFooter } from '@languist/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@languist/ui/dropdown-menu'
import { Gauge } from '@languist/ui/gauge'
import { Skeleton } from '@languist/ui/skeleton'
import { Tooltip, TooltipContent, TooltipTrigger } from '@languist/ui/tooltip'
import { formatRelative } from 'date-fns/formatRelative'
import Link from 'next/link'
import { CircleFlagLanguage } from 'react-circle-flags'

import { useI18n } from '@/locales/client'
import { languages } from '@/modules/common/languages'

type ProjectLanguageCardProps = {
  project: Project
  data: ProjectLanguage
  isSourceLanguage?: boolean
}

export function ProjectLanguageCard({
  project,
  data,
  isSourceLanguage,
}: ProjectLanguageCardProps) {
  const t = useI18n()
  const { data: lastEditedTranslation, isLoading } =
    useLastEditedTranslationByProjectLanguage(project.id, data.language)

  return (
    <div className="relative grid">
      <Link
        className="focus-visible:ring-ring grid focus-visible:rounded-xl focus-visible:outline-none focus-visible:ring-4"
        href={`${project.id}/editor/${data.language}`}
      >
        <Card className="bg-muted group flex flex-col border-none p-1 pb-0 shadow-none">
          <CardContent className="bg-background relative flex flex-1 flex-col justify-between gap-1 rounded-lg p-3 shadow-sm">
            <div className="flex gap-3">
              <CircleFlagLanguage
                className="mt-1 size-5"
                languageCode={data.language!}
              />
              <div>
                <h3 className="line-clamp-1 text-sm font-semibold">
                  {languages.find((l) => l.code === data.language)?.name}
                </h3>
                <div className="text-muted-foreground text-xs">
                  {t('project.languageList.phraseCount', {
                    count: data.phrase_count,
                  })}
                </div>
              </div>
            </div>
            <div className="flex items-end justify-between gap-2">
              <Badge
                className="w-fit"
                variant={isSourceLanguage ? 'secondary' : 'outline'}
              >
                {isSourceLanguage
                  ? t('project.languageList.source')
                  : t('project.languageList.target')}
              </Badge>
              {data.phrase_count > 0 && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span>
                      <Gauge
                        showAnimation
                        showValue
                        size="xs"
                        value={
                          (data.translated_count / data.phrase_count) * 100
                        }
                      />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    {t('project.languageList.todoCount', {
                      count: data.phrase_count - data.translated_count,
                    })}
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
          </CardContent>
          <CardFooter className="text-muted-foreground relative flex h-8 justify-between overflow-hidden px-3 py-2 text-xs">
            <span className="line-clamp-1 transition ease-[cubic-bezier(0.2,0.4,0,1)] group-hover:-translate-x-[calc(100%+theme(spacing.4))] group-has-[a:focus-visible]:-translate-x-[calc(100%+theme(spacing.4))] motion-reduce:duration-0">
              {isLoading ? (
                <Skeleton className="bg-muted-foreground/50 h-4 w-24" />
              ) : (
                t('project.languageList.lastEdited', {
                  date: formatRelative(
                    lastEditedTranslation
                      ? new Date(lastEditedTranslation.created_at)
                      : new Date(),
                    new Date(),
                  ),
                })
              )}
            </span>
            <span className="line-clamp-1 flex flex-shrink-0 translate-x-[calc(100%+theme(spacing.4))] items-center gap-1 font-medium transition ease-[cubic-bezier(0.2,0.4,0,1)] group-hover:translate-x-0 group-has-[a:focus-visible]:translate-x-0 motion-reduce:duration-0">
              {t('project.languageList.openEditor')}
              <ArrowRight className="size-4" />
            </span>
          </CardFooter>
        </Card>
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="aria-expanded:bg-muted absolute right-3 top-3 h-8 w-8"
            size="icon"
            type="button"
            variant="ghost"
          >
            <HorizontalDotsBulk className="size-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" side="bottom">
          {isSourceLanguage ? (
            <DropdownMenuItem>
              <UploadFileBulk className="mr-2 size-5" />
              {t('project.languageList.uploadSourceFile')}
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem>
              <UploadFileBulk className="mr-2 size-5" />
              {t('project.languageList.uploadTranslationFile')}
            </DropdownMenuItem>
          )}
          <DropdownMenuItem disabled={!data.file_count}>
            <ExportBulk className="mr-2 size-5" />
            {t('project.languageList.exportAllFiles', {
              count: data.file_count,
            })}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
