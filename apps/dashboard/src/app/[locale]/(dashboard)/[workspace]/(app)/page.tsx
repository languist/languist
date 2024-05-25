'use client'

import { useOrganization } from '@languist/queries'
import { AppLoader } from '@languist/ui/app-loader'

import { useWorkspace } from '@/modules/common/hooks/use-workspace'

export default function DashboardPage() {
  const workspace = useWorkspace()
  const { data, isLoading } = useOrganization(workspace)

  if (isLoading) {
    return <AppLoader />
  }

  if (!data) {
    return <div>Not found</div>
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Current workspace: {data?.name}</p>
    </div>
  )
}
