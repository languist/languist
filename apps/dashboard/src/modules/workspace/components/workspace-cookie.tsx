'use client'

/**
 * Set current workspace to cookie
 */
import { setCookie } from 'cookies-next'

export function WorkspaceCookie({ workspace }: { workspace: string }) {
  setCookie('workspace', workspace)

  return null
}
