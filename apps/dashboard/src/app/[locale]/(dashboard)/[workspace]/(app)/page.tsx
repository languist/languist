'use client'

import { Plus } from '@languist/icons'
import { useOrganization, useOrganizationProjects } from '@languist/queries'
import { AppLoader } from '@languist/ui/app-loader'
import { Button } from '@languist/ui/button'

import { useI18n } from '@/locales/client'
import { useWorkspace } from '@/modules/common/hooks/use-workspace'
import { ProjectFormDialog } from '@/modules/project/components/project-form-dialog'
import { ProjectCard } from '@/modules/project/components/project-card'

export default function DashboardPage() {
  const workspace = useWorkspace()
  const t = useI18n()
  const { data, isLoading } = useOrganization(workspace)
  const { data: projects } = useOrganizationProjects(data?.id)

  if (isLoading) {
    return <AppLoader />
  }

  if (!data) {
    return <div>Not found</div>
  }

  return (
    <div className="container max-w-6xl px-5 py-8 pb-20 lg:p-14">
      <h1 className="animate-in fade-in fill-mode-both text-3xl font-semibold delay-0 duration-1000">
        {t('project.listTitle')}
      </h1>
      <div className="animate-in fade-in fill-mode-both mt-9 grid auto-rows-[minmax(14rem,_1fr)] grid-cols-[repeat(1,_minmax(15rem,_1fr))] gap-8 delay-200 duration-1000 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {projects?.map(project => <ProjectCard data={project} key={project.id} />)}
        <ProjectFormDialog
          organizationId={data.id}
          trigger={
            <Button
              className="bg-muted/50 text-muted-foreground h-auto rounded-xl border-dashed"
              variant="outline"
            >
              <Plus className="mr-2 size-5" />
              {t('project.createNewProject')}
            </Button>
          }
        />
      </div>
    </div>
  )
}
