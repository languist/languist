import { Logo } from '@languist/ui/logo'
import { Separator } from '@languist/ui/separator'
import Link from 'next/link'

import { UserDropdownMenu } from '../components/user-dropdown-menu'
import { WorkspaceDropdownMenu } from '../components/workspace-dropdown-menu'

export type DashboardLayoutProps = {
  children: React.ReactNode
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="bg-card sticky top-0 z-10 flex h-16 items-center justify-between gap-2 border-b px-4">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Logo size="sm" />
          </Link>
          <Separator className="ml-2 h-5 rotate-12" orientation="vertical" />
          <WorkspaceDropdownMenu />
          <Separator className="ml-2 h-5 rotate-12" orientation="vertical" />
        </div>
        <div className="flex items-center gap-2">
          <UserDropdownMenu />
        </div>
      </header>
      <div className="relative">{children}</div>
    </div>
  )
}
