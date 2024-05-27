import type { FC } from 'react'

import { useProfile } from '@languist/queries'
import type { AvatarProps } from '@languist/ui/avatar'
import { Avatar, AvatarFallback, AvatarImage } from '@languist/ui/avatar'

export type UserAvatarProps = {
  userId: string
} & AvatarProps

export const UserAvatar: FC<UserAvatarProps> = ({ userId, ...props }) => {
  const { data } = useProfile(userId)

  const profile = data?.data
  const fallback =
    (profile?.first_name?.charAt(0).toUpperCase() ?? '') +
      (profile?.last_name?.charAt(0).toUpperCase() ?? '') ||
    profile?.email?.charAt(0).toUpperCase()

  return (
    <Avatar {...props}>
      <AvatarImage
        alt={profile?.email!}
        src={profile?.avatar_url ?? undefined}
      />
      <AvatarFallback className="bg-avatar-fallback text-primary-foreground bg-cover">
        {fallback}
      </AvatarFallback>
    </Avatar>
  )
}
