import { useEffect } from 'react'

import { useAuth } from '@languist/auth'
import { useParams } from 'next/navigation'

import { useLocalStorage } from './use-local-storage'

/**
 * Get the current workspace from localStorage if available.
 * The value is synced with the query params.
 */
export function useWorkspace() {
  const params = useParams()
  const { isAuthenticated, isLoading } = useAuth()
  const workspace = params.workspace?.toString() || ''

  const [activeWorkspace, setWorkspace] = useLocalStorage(
    'app.workspace',
    workspace,
  )

  useEffect(() => {
    if (workspace && workspace !== activeWorkspace) {
      setWorkspace(workspace)
    }
    if (!isLoading && !isAuthenticated) {
      setWorkspace('')
    }
  }, [
    activeWorkspace,
    isAuthenticated,
    isLoading,
    params,
    setWorkspace,
    workspace,
  ])

  return activeWorkspace
}
