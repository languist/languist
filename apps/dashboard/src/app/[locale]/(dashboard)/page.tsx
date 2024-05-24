'use client'

import { useAuth } from '@languist/auth'
import { Button } from '@languist/ui/button'
import { useRouter } from 'next/navigation'

import { AuthGreeting } from '@/modules/auth/auth-greeting'
import { ModeToggle } from '@/modules/common/mode-toggle'

export default function Home() {
  const { logOut } = useAuth()
  const router = useRouter()

  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-24">
      <AuthGreeting />
      <Button
        onClick={() => {
          logOut()
          router.replace('/auth/login')
        }}
      >
        Logout
      </Button>
      <ModeToggle />
    </main>
  )
}
