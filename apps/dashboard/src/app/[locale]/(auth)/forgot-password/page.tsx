import type { Metadata } from 'next'

import { ForgotPasswordForm } from '@/modules/auth/forgot-password-form'

export const metadata: Metadata = {
  title: 'Password recovery',
}

export default function ForgotPassword() {
  return (
    <div className="flex w-full max-w-96 flex-col gap-4">
      <ForgotPasswordForm />
    </div>
  )
}
