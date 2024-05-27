import type { FC } from 'react'

import { useAuth } from '@languist/auth'
import { MacbookBulk, MoonBulk, SunBulk } from '@languist/icons'
import { useQueryClient } from '@languist/queries'
import { Button } from '@languist/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@languist/ui/dropdown-menu'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'

import { useI18n } from '@/locales/client'

import { UserAvatar } from './user-avatar'

type UserDropdownMenuProps = {}

export const UserDropdownMenu: FC<UserDropdownMenuProps> = () => {
  const t = useI18n()
  const { user, logOut } = useAuth()
  const router = useRouter()
  const queryClient = useQueryClient()
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-auto rounded-full p-0" variant="ghost">
          <UserAvatar userId={user?.id!} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-52" side="bottom">
        <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>{t('common.manageAccount')}</DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                <DropdownMenuRadioItem value="light">
                  <SunBulk className="mr-2 h-4 w-4" />
                  {t('common.theme.light')}
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="dark">
                  <MoonBulk className="mr-2 h-4 w-4" />
                  {t('common.theme.dark')}
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="system">
                  <MacbookBulk className="mr-2 h-4 w-4" />
                  {t('common.theme.system')}
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            logOut()
            router.replace('/auth/login')
            queryClient.clear()
          }}
        >
          {t('auth.logout')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
