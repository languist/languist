'use client'

import { ArrowRight, WorkspaceBulk, Plus, SettingBulk } from '@languist/icons'
import { useOrganization, useOrganizations } from '@languist/queries'
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

import { useWorkspace } from '../hooks/use-workspace'

export function WorkspaceDropdownMenu() {
  const t = useI18n()
  const slug = useWorkspace()
  const { data: workspace, isLoading } = useOrganization(slug)
  const { data: workspaces, isLoading: isLoadingWorkspaces } =
    useOrganizations()

  if (isLoading || isLoadingWorkspaces) {
    return <Skeleton className="bg-muted h-8 w-[130px] rounded-md" />
  }

  return (
    <div className="flex">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="aria-expanded:bg-muted px-3" variant="ghost">
            <WorkspaceBulk className="text-primary mr-2 h-5 w-5" />
            {workspace?.name}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="min-w-52" side="bottom">
          <DropdownMenuItem className="hover:!bg-inherit">
            <WorkspaceBulk className="text-primary mr-2 h-5 w-5" />
            {workspace?.name}
            <DropdownMenuShortcut>
              <Button asChild className="h-7 w-7" size="icon" variant="outline">
                <Link href={`/${workspace?.slug}/settings`}>
                  <SettingBulk className="size-4" />
                </Link>
              </Button>
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          {workspaces
            ?.filter((item) => item?.id !== workspace?.id)
            ?.map((item) => (
              <DropdownMenuItem key={item?.id} asChild className="group">
                <Link href={`/${item?.slug}`}>
                  <WorkspaceBulk className="text-primary mr-2 h-5 w-5" />
                  {item?.name}
                  <DropdownMenuShortcut>
                    <ArrowRight className="size-4 opacity-0 group-hover:opacity-100" />
                  </DropdownMenuShortcut>
                </Link>
              </DropdownMenuItem>
            ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/getting-started">
              <div className="bg-muted mr-2 grid h-5 w-5 place-items-center rounded-full border border-dashed">
                <Plus className="h-4 w-4" />
              </div>
              {t('workspace.createNewWorkspace')}
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
