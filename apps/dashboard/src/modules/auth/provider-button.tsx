'use client'

import { useLogin } from '@languist/auth'
import type { ButtonProps } from '@languist/ui/button'
import { Button } from '@languist/ui/button'

type ProviderButtonProps = {
  provider: string
} & ButtonProps

export function ProviderButton({ provider, ...props }: ProviderButtonProps) {
  const [{ isLoading }, submit] = useLogin({ action: 'logIn' })

  return (
    <Button
      className="w-full"
      disabled={isLoading}
      type="button"
      variant="outline"
      onClick={async () => {
        await submit(
          { provider },
          {
            redirectTo: `${process.env.NEXT_PUBLIC_ORIGIN_URL}/auth/callback`,
          },
        )
      }}
      {...props}
    />
  )
}
