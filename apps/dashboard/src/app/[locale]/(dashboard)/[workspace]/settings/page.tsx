'use client'

import { useWorkspace } from '@/modules/common/hooks/use-workspace'

export default function SettingsOverviewPage() {
  const workspace = useWorkspace()

  return (
    <div>
      <h1>Settings Overview</h1>
      <p>Current workspace: {workspace}</p>
    </div>
  )
}
