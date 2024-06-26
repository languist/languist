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

type WorkspaceDropdownMenuProps = {
  workspace: string
}

export function WorkspaceDropdownMenu({
  workspace,
}: WorkspaceDropdownMenuProps) {
  const t = useI18n()
  const { data: currentWorkspace, isLoading } = useOrganization(workspace)
  const { data: allWorkspaces } = useOrganizations()

  if (isLoading) {
    return <Skeleton className="bg-muted h-8 w-[130px] rounded-md" />
  }

  const otherWorkspaces = allWorkspaces?.filter(
    (item) => item?.id !== currentWorkspace?.id,
  )

  return (
    <div className="animate-in fade-in fill-mode-both flex delay-100 duration-1000">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="aria-expanded:bg-muted px-3" variant="ghost">
            <WorkspaceBulk className="text-primary mr-2 h-5 w-5" />
            {currentWorkspace?.name}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="min-w-52" side="bottom">
          <DropdownMenuItem className="font-medium hover:!bg-inherit">
            <WorkspaceBulk className="text-primary mr-2 h-5 w-5" />
            {currentWorkspace?.name}
            <DropdownMenuShortcut>
              <Button asChild className="h-7 w-7" size="icon" variant="outline">
                <Link href={`/${currentWorkspace?.slug}/settings`}>
                  <SettingBulk className="size-4" />
                </Link>
              </Button>
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          {!!otherWorkspaces?.length && (
            <>
              <DropdownMenuSeparator />
              {otherWorkspaces?.map((item) => (
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
            </>
          )}
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
