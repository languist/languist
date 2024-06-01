'use client'

import { useWorkspace } from '@/modules/common/hooks/use-workspace'
import { FullscreenLayout } from '@/modules/common/layouts/fullscreen-layout'

export default ({ children }: { children: React.ReactNode }) => {
  const workspace = useWorkspace()
  return (
    <FullscreenLayout shouldShowBackButton={!!workspace}>
      {children}
    </FullscreenLayout>
  )
}
