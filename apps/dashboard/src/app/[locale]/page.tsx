import { Button } from '@languist/ui/button'

import { AuthGreeting } from '@/modules/auth/auth-greeting'
import { ModeToggle } from '@/modules/common/mode-toggle'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-24">
      <AuthGreeting />
      <Button>Languist</Button>
      <ModeToggle />
    </main>
  )
}
