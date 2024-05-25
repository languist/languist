'use client'

import { useAuth } from '@languist/auth'
import { Button } from '@languist/ui/button'
import { useRouter } from 'next/navigation'

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const { logOut } = useAuth()
  return (
    <div className="grid place-items-center gap-4 p-4">
      {children}
      <Button
        onClick={() => {
          logOut()
          router.replace('/auth/login')
        }}
      >
        Logout
      </Button>
    </div>
  )
}
