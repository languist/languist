import type { Metadata } from 'next'

import { UpdatePasswordForm } from '@/modules/auth/update-password-form'

export const metadata: Metadata = {
  title: 'Update password',
}

export default function UpdatePassword() {
  return (
    <div className="flex w-full max-w-96 flex-col gap-4">
      <UpdatePasswordForm />
    </div>
  )
}
