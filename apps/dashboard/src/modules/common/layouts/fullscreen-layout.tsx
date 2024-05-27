'use client'

/**
 * Fullscreen layout, includes a simple header and empty body, for functionality that requires extra focus, like onboarding/checkout/etc.
 */

import { useAuth } from '@languist/auth'
import { ArrowLeft } from '@languist/icons'
import { useQueryClient } from '@languist/queries'
import { Button } from '@languist/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@languist/ui/dropdown-menu'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { ModeToggle } from '../mode-toggle'

export type FullscreenLayoutProps = {
  children: React.ReactNode
  shouldShowBackButton?: boolean
}

export const FullscreenLayout = ({
  children,
  shouldShowBackButton,
}: FullscreenLayoutProps) => {
  const { user, logOut } = useAuth()
  const router = useRouter()
  const queryClient = useQueryClient()

  return (
    <div className="flex min-h-screen flex-col">
      <div className="pointer-events-none absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:bg-[radial-gradient(rgba(229,231,235,0.2)_1px,transparent_1px)]" />
      <div className="relative flex justify-between gap-2 p-2">
        {shouldShowBackButton ? (
          <Button asChild size="icon" variant="ghost">
            <Link href="..">
              <ArrowLeft className="size-5" />
            </Link>
          </Button>
        ) : (
          <div />
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="h-auto flex-col items-start" variant="ghost">
              <div className="text-muted-foreground text-xs">Logged in as</div>
              <div>{user?.email}</div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-52" side="bottom">
            <DropdownMenuItem
              onClick={() => {
                logOut()
                router.push('/login')
                queryClient.clear()
              }}
            >
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {children}
      <ModeToggle className="absolute bottom-2 right-2" />
    </div>
  )
}
