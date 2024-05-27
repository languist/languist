import { Plus } from '@languist/icons'
import {
  getCachedOrganization,
  getCachedOrganizationProjects,
} from '@languist/queries'
import { Button } from '@languist/ui/button'

import { getI18n } from '@/locales/server'
import { ProjectCard } from '@/modules/project/components/project-card'
import { ProjectFormDialog } from '@/modules/project/components/project-form-dialog'
import { WorkspaceCookie } from '@/modules/workspace/components/workspace-cookie'

export default async function DashboardPage({
  params,
}: {
  params: { workspace: string }
}) {
  const t = await getI18n()
  const data = await getCachedOrganization(params.workspace)

  if (!data) {
    return <div>Not found</div>
  }

  const projects = await getCachedOrganizationProjects(data.id)

  return (
    <div className="container max-w-6xl px-5 py-8 pb-20 lg:p-14">
      <h1 className="animate-in fade-in fill-mode-both text-3xl font-semibold delay-0 duration-1000">
        {t('project.listTitle')}
      </h1>
      <div className="animate-in fade-in fill-mode-both mt-9 grid auto-rows-[minmax(10rem,_1fr)] grid-cols-[repeat(1,_minmax(15rem,_1fr))] gap-8 delay-200 duration-1000 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {projects?.map((project) => (
          <ProjectCard
            key={project.id}
            data={project}
            workspace={params.workspace}
          />
        ))}
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
      <WorkspaceCookie workspace={params.workspace} />
    </div>
  )
}
