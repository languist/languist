import { DashboardBreadcrumb } from '../components/dashboard-breadcrumb'
import { UserDropdownMenu } from '../components/user-dropdown-menu'

export type DashboardLayoutProps = {
  children: React.ReactNode
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="bg-card sticky top-0 z-10 flex h-16 items-center justify-between gap-2 border-b px-4">
        <DashboardBreadcrumb />
        <div className="animate-in fade-in fill-mode-both flex items-center gap-2 delay-0 duration-1000">
          <UserDropdownMenu />
        </div>
      </header>
      <div className="relative flex flex-1">{children}</div>
    </div>
  )
}
