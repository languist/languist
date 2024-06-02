'use client'

import { useProject } from '@languist/queries'

import { useI18n } from '@/locales/client'

import { ProjectLanguageCard } from './project-language-card'

type ProjectLanguagesProps = {
  projectId: string
}

export function ProjectLanguages({ projectId }: ProjectLanguagesProps) {
  const { data } = useProject(projectId)
  const t = useI18n()
  return (
    <div className="flex flex-col gap-4">
      <div className="animate-in fade-in fill-mode-both flex items-center justify-between gap-4 delay-0 duration-1000">
        <h1 className="text-xl font-semibold">
          {t('project.languageList.title')}
        </h1>
      </div>
      <div className="animate-in fade-in fill-mode-both grid h-full auto-rows-[minmax(10rem,_1fr)] grid-cols-[repeat(1,_minmax(15rem,_1fr))] flex-col gap-4 delay-200 duration-1000 sm:grid-cols-2 md:grid-cols-3">
        {data?.languages?.map((item) => (
          <ProjectLanguageCard
            key={item.language}
            data={item}
            isSourceLanguage={data.source_language === item.language}
            project={data}
          />
        ))}
      </div>
    </div>
  )
}
