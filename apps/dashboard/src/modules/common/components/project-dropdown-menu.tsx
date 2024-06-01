'use client'

import { ArrowRight, ProjectBulk, Plus, SettingBulk } from '@languist/icons'
import {
  useOrganization,
  useOrganizationProjects,
  useProject,
} from '@languist/queries'
import { Button } from '@languist/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@languist/ui/dropdown-menu'
import { Skeleton } from '@languist/ui/skeleton'
import Link from 'next/link'

import { useI18n } from '@/locales/client'
import { ProjectFormDialog } from '@/modules/project/components/project-form-dialog'

type ProjectDropdownMenuProps = {
  workspace: string
  projectId: string
}

export function ProjectDropdownMenu({
  workspace,
  projectId,
}: ProjectDropdownMenuProps) {
  const t = useI18n()
  const { data: currentProject, isLoading: isLoadingCurrentProject } =
    useProject(projectId)
  const { data: currentWorkspace } = useOrganization(workspace)
  const { data: projects } = useOrganizationProjects(currentWorkspace?.id)

  if (isLoadingCurrentProject) {
    return <Skeleton className="bg-muted h-8 w-[130px] rounded-md" />
  }

  const otherProjects = projects?.filter(
    (item) => item?.id !== currentProject?.id,
  )

  return (
    <div className="animate-in fade-in fill-mode-both flex delay-200 duration-1000">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="aria-expanded:bg-muted px-3" variant="ghost">
            <ProjectBulk className="text-primary mr-2 h-5 w-5" />
            {currentProject?.name}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="min-w-52" side="bottom">
          <DropdownMenuItem className="font-medium hover:!bg-inherit">
            <ProjectBulk className="text-primary mr-2 h-5 w-5" />
            {currentProject?.name}
            <DropdownMenuShortcut>
              <Button asChild className="h-7 w-7" size="icon" variant="outline">
                <Link href={`/${workspace}/${currentProject?.id}/settings`}>
                  <SettingBulk className="size-4" />
                </Link>
              </Button>
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          {!!otherProjects?.length && (
            <>
              <DropdownMenuSeparator />
              {otherProjects?.map((item) => (
                <DropdownMenuItem key={item?.id} asChild className="group">
                  <Link href={`/${workspace}/${item?.id}`}>
                    <ProjectBulk className="text-primary mr-2 h-5 w-5" />
                    {item?.name}
                    <DropdownMenuShortcut>
                      <ArrowRight className="size-4 opacity-0 group-hover:opacity-100" />
                    </DropdownMenuShortcut>
                  </Link>
                </DropdownMenuItem>
              ))}
            </>
          )}
          {currentWorkspace && (
            <>
              <DropdownMenuSeparator />
              <ProjectFormDialog
                organizationId={currentWorkspace.id}
                trigger={
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <div className="bg-muted mr-2 grid h-5 w-5 place-items-center rounded-full border border-dashed">
                      <Plus className="h-4 w-4" />
                    </div>
                    {t('project.createNewProject')}
                  </DropdownMenuItem>
                }
              />
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
