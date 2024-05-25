'use client'

import { useEffect } from 'react'

import { useOrganizations } from '@languist/queries'
import { AppLoader } from '@languist/ui/app-loader'
import { useRouter } from 'next/navigation'

import { useWorkspace } from '@/modules/common/hooks/use-workspace'

export default function Home() {
  const router = useRouter()
  const workspace = useWorkspace()
  const { isLoading: isLoadingOrgs, data: organizations } = useOrganizations()

  useEffect(() => {
    if (workspace) {
      router.push(`/${workspace}`)
      return
    }

    if (isLoadingOrgs) {
      return
    }

    if (organizations?.[0]) {
      router.push(`/${organizations[0].slug}`)
      return
    }

    router.push('/getting-started')
  }, [isLoadingOrgs, organizations, router, workspace])

  return <AppLoader />
}
